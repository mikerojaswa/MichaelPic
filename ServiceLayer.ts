export class ServiceLayer{
    saveImage(image: string){
        fetch('http://192.168.100.185:3000/', {
            method: 'POST',
            headers: {
                "Content-type": "application/json"
            },
            body: JSON.stringify({
                img: image
            })
        }).then((res)=>{
            return res.json();
        }).then((json)=>{
            console.log(json);
        }).catch((ex)=>{
            console.error(ex)
        });
    }

    base64Encode(url: string){
        fetch(url)
            .then(response => response.blob())
            .then(blob => new Promise((resolve, reject) => {
                const reader = new FileReader()
                reader.onloadend = () => resolve(reader.result)
                reader.onerror = reject
                reader.readAsDataURL(blob)
            })).then(dataUrl => {
            console.log('RESULT:', dataUrl)
        })
    }
}