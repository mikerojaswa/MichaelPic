const IPADDRESS: string = '192.168.100.185';

export class ServiceLayer{
    saveImage(image: string){

        let body = JSON.stringify({test: image });
        console.log('Here');
        fetch('http://' + IPADDRESS + ':3000/', {
            method: 'POST',
            headers: {
                "Content-type": "application/json"
            },
            body: body

        }).then((res)=>{
            return res.json();
        }).then((json)=>{
            console.log(json);
        }).catch((ex)=>{
            console.error(ex)
        });
    }

    getFileContentAsBase64(path,callback){
    window.resolveLocalFileSystemURL(path, gotFile, fail);

    function fail(e) {
        alert('Cannot found requested file');
    }

    function gotFile(fileEntry) {
        fileEntry.file(function(file) {
            var reader = new FileReader();
            reader.onloadend = function(e) {
                var content = this.result;
                callback(content);
            };
            // The most important point, use the readAsDatURL Method from the file plugin
            reader.readAsDataURL(file);
        });
    }
    }

    getImageDataArray(imageArray){
        fetch('http://' + IPADDRESS + ':3000/', {
            method: 'GET',
            headers: {
                "Content-type": "application/json"
            }

        }).then((res)=>{
            return res.json();
        }).then((json)=>{
            for(let i =0; i<json.length; i++){
                imageArray.push(json[i]);
            }

        }).catch((ex)=>{
            console.error(ex)
        });
    }
}