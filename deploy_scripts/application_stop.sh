#!/bin/bash
systemctl stop nginx.service
systemctl stop aerohyre-job.service
systemctl disable aerohyre-job.service