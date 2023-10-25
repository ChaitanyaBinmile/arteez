import { Response } from 'express';
import { sendResponse } from '../../../lib/utils/JsonResponse';
import { RESPONSE_CODE } from '../../../lib/utils/ApiConstants';
import { getMessages } from '../../../lib/utils/languageHelper';
import { MessagesTypes } from '../../types/common/MessageDataType';
import { ExtendedRequest } from '../../types/user/UserDataType';
import candidateJobService from '../../services/candidate/JobService';
import { getJobListData} from '../../types/candidate/JobDataType';


const getJobList = async (req: ExtendedRequest, res: Response) => {
  const messages = (await getMessages(req)) as MessagesTypes;
  try {
    let resMsg = messages.FETCHED_SUCCESS;
    const {
      search_text,
       limit,
      page_num,
    } = req.body as getJobListData;

    const result = (await candidateJobService.findCandidateJobs(
      search_text,
      limit,
      page_num,
    )) as unknown as { total_jobs_count: number; jobs: any[] };

    if (result.total_jobs_count == 0) {
      resMsg = messages.JOBS_NOT_FOUND;
    }
    return sendResponse(res, RESPONSE_CODE.HTTP_200_OK, result, resMsg);
  } catch (e) {
    switch (e) {
      case 'INVALID_PAGE_NUMBER':
        return sendResponse(res, RESPONSE_CODE.HTTP_400_BAD_REQUEST, {}, messages.INVALID_PAGE_NUMBER);
      default:
        return sendResponse(res, RESPONSE_CODE.HTTP_400_BAD_REQUEST, {}, (e as Error).message);
    }
  }
};



const candidateJobController = {

  getJobList
};

export default candidateJobController;