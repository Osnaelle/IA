import ytdl  from "ytdl-core";
import fs from 'fs'

export const download = (videoId) => new Promise((resolve, reject) => {
    const videoURl = "https://www.youtube.com/shorts/" + videoId
    console.log("Realizando o download do video" , videoId)


    ytdl(videoURl, {quality: "lowestaudio" , filter: "audioonly"})
    .on("info", (info)=>{
        const seconds = info.formats[0].approxDurationsMs / 1000
        if (seconds > 60){
            throw new Error("A duração desse vídeo é maior que 60 segundos")
        }

    })
    .on("end", () =>{
        console.log("Download do video finalizado ")
        resolve()
    })

    .on("error", ()=>{
        console.log("Não foi possivel fazer o download do vídeo", error)
     
        reject()

    }).pipe(fs.createWriteStream('./temp/audio.mp4'))
    
})