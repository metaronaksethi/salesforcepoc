public class BulkDataUpsert {
    
    public static void createjob(){
        TokenDetail__c tokendetail   =  [select id,token__c ,InstanceURL__c from TokenDetail__c];
        if(tokendetail.Token__c != null){
            String body = '{"object" :"Account","externalIdFieldName":"myExtId__c","contentType":"CSV","operation":"upsert","lineEnding":"CRLF"}';
            String endPoint = tokendetail.InstanceURL__c+'/services/data/v56.0/jobs/ingest';
            system.debug('endPoint'+endPoint);
            Http h2 = new Http();
            HttpRequest request = new HttpRequest();
            request.setHeader('Authorization','Bearer ' + tokendetail.Token__c);
            request.setHeader('Content-Type', 'application/json');
            request.setMethod('POST');
            request.setEndpoint(endPoint);
            request.setBody(body);
            HttpResponse response = h2.send(request);
            system.debug('Response'+ response.getBody());
            system.debug('status'+ response.getStatusCode());
        } 
    }
    
    
    public static void UpsertAccount(){
        
        TokenDetail__c tokendetail   =  [select id,token__c ,InstanceURL__c from TokenDetail__c];
        if(tokendetail.Token__c != null){
            String endPoint = tokendetail.InstanceURL__c+'/services/data/v56.0/jobs/ingest/750Dp000000UHJ0IAO/batches/';
            document doc	=    [SELECT Id, Body FROM document where name='AccountData'];
            System.debug('blob'+doc.Body.toString());
            Http h2 = new Http();
            HttpRequest request = new HttpRequest();
            request.setHeader('Authorization','Bearer ' + tokendetail.Token__c);
            request.setHeader('Content-Type', 'text/csv');
            request.setMethod('PUT');
            request.setEndpoint(endPoint);
            request.setBody(doc.Body.toString());
            HttpResponse response = h2.send(request);
            system.debug('Response'+ response.getBody());
            system.debug('status'+ response.getStatusCode());
        } 
    }
    public static void DoneJob(){
        String body = '{"state" :"UploadComplete"}';
        
        TokenDetail__c tokendetail   =  [select id,token__c ,InstanceURL__c from TokenDetail__c];
        if(tokendetail.Token__c != null){
            String endPoint = tokendetail.InstanceURL__c+'/services/data/v56.0/jobs/ingest/750Dp000000UHJ0IAO/';
            
            Http h2 = new Http();
            HttpRequest request = new HttpRequest();
            request.setHeader('Authorization','Bearer ' + tokendetail.Token__c);
            request.setHeader('Content-Type', 'application/json');
            request.setMethod('PATCH');
            request.setEndpoint(endPoint);
            request.setBody(body);
            HttpResponse response = h2.send(request);
            system.debug('Response'+ response.getBody());
            system.debug('status'+ response.getStatusCode());
        } 
    }
    public static void results(){
        
        TokenDetail__c tokendetail   =  [select id,token__c ,InstanceURL__c from TokenDetail__c];
        if(tokendetail.Token__c != null){
            String endPoint = tokendetail.InstanceURL__c+'/services/data/v56.0/jobs/ingest/750Dp000000UHJ0IAO/unprocessedRecords';
            
            Http h2 = new Http();
            HttpRequest request = new HttpRequest();
            request.setHeader('Authorization','Bearer ' + tokendetail.Token__c);
            request.setHeader('Content-Type', 'application/json');
            request.setHeader('Accept', 'text/csv');
            request.setMethod('GET');
            request.setEndpoint(endPoint);
            //request.setBody(body);
            HttpResponse response = h2.send(request);
            system.debug('Response'+ response.getBodyAsBlob());
            system.debug('status'+ response.getStatusCode());
        } 
    }
    
    
    public static void getBlob(){
                document doc	=    [SELECT Id, Body FROM document where name='AccountData'];
blob data =doc.Body;
system.debug('data'+data);        
    }
                     
                     }