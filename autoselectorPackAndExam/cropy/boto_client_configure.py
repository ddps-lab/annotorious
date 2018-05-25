import boto3 as bt
import os,sys

class AWSManager():

    app = "S3"
    
    def config_s3(self, app):
        #is hardcoding.
        client = bt.client(
            app,
            region_name = 'ap-northeast-2',
            aws_access_key_id = 'AKIAJBLBZCRH7HTD7JQQ',
            aws_secret_access_key = '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'
        )
        return client




    
        
