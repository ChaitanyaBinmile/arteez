import { QueryTypes } from 'sequelize';
import dbConnection from '../../config/postgres.database';
import { PUBLISH_STATUS } from '../../config/enum';
import { getOffset } from '../../../lib/utils/commonHelper';

interface JobCountResult {
  jobs_count: number;
}

interface CandidateJob {
  jobs: any[];
  total_jobs_count: number;
}

async function findCandidateJobs(
  search_text: string | undefined,
  limit: number,
  page_num: number,
) {
  return new Promise<CandidateJob>((resolve, reject) => {
    async function fetchData() {
      try {
        console.log('search_text', search_text);
        const offset = await getOffset(limit, page_num);
        const conditions: string[] = [];

        const replacements = {
          isActive: true,
          isDeleted: false,
          publishStatus: PUBLISH_STATUS.PUBLISHED,
        };

        const whereClause = conditions.length > 0 ? `AND (${conditions.join(' OR ')})` : '';
        const jobsCountQuery = `SELECT COUNT(J.id) AS jobs_count
                                FROM jobs AS J
                                WHERE 1 = 1 ${whereClause} AND J.start_date <= CURRENT_DATE AND J.end_date >= CURRENT_DATE AND J.is_active = :isActive AND J.is_deleted = :isDeleted AND J.publish_status = :publishStatus`;

        const jobsCount = await dbConnection.query<JobCountResult>(jobsCountQuery, {
          type: QueryTypes.SELECT,
          replacements,
        });
        const jobsQuery = `SELECT *
                           FROM (SELECT DISTINCT
                                 ON (J.start_date, J.id) J.id AS job_id, J.job_title, J.job_slug, j.source, J.publish_status, J.country, J.state, J.city, J.start_date, J.created_at, J.org_id, O.org_name, O.org_image_path, O.org_image , J.job_type_id, JT.job_type, J.job_mode_id, JM.job_mode
                                 FROM jobs AS J LEFT JOIN organizations O
                                 ON O.id = J.org_id LEFT JOIN job_types JT ON JT.id = J.job_type_id LEFT JOIN job_modes JM ON JM.id = J.job_mode_id
                                 WHERE 1 = 1 ${whereClause}
                                   AND J.start_date <= CURRENT_DATE
                                   AND J.end_date >= CURRENT_DATE
                                   AND J.is_active = :isActive
                                   AND J.is_deleted = :isDeleted
                                   AND J.publish_status = :publishStatus
                                 ORDER BY J.start_date DESC, J.id ASC) AS jobQuery
                           ORDER BY jobQuery.start_date DESC, jobQuery.created_at DESC LIMIT ${limit}
                           OFFSET ${offset}`;
        const jobs = await dbConnection.query(jobsQuery, {
          type: QueryTypes.SELECT,
          replacements,
        });

        const total_jobs_count = jobsCount[0].jobs_count;
        resolve({ total_jobs_count, jobs });
      } catch (e) {
        reject(e);
      }
    }

    fetchData()
      .then((result) => {
        return result;
      })
      .catch((e) => {
        return (e as Error).message;
      });
  });
}

const candidateJobService = {
  findCandidateJobs,
};

export default candidateJobService;
