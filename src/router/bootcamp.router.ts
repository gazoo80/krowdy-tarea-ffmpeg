import {Router} from 'restify-router'
import bootcampController from '../controller/bootcamp.controller'
import path from 'path'

export const bootcampRoute = new Router()

bootcampRoute.get('/session', async( req, res)=>{
    try {
        const oauthResponse = await bootcampController.getSession()
        return res.json({success: true, message: 'Estamos conectados', oauth2: oauthResponse})
    } catch (error) {
        return res.json({succes: false, error: true})
    }
})

bootcampRoute.get('/webmtomp4', async( req, res)=>{

    const inputFile = path.join(__dirname, '../files/input/fileWEBM.webm');

    try {
        await bootcampController.transformWebmToMp4(inputFile);

        return res.json({success: true, message: 'Archivo transformado'});
        
    } catch (error) {
        return res.json({succes: false, error: true});
    }
});

bootcampRoute.get('/mp4towebm', async( req, res)=>{

    const inputFile = path.join(__dirname, '../files/input/fileMP4.mp4');

    try {
        await bootcampController.transformMp4ToWebm(inputFile);

        return res.json({success: true, message: 'Archivo transformado'});
        
    } catch (error) {
        return res.json({succes: false, error: true});
    }
});

bootcampRoute.get('/mutevideos', async( req, res)=>{

    const videoFiles = [
        {
            inputFile: path.join(__dirname, '../files/input/fileMP4.mp4'),
            fileName: 'fileMP4.mp4'
        },
        {
            inputFile: path.join(__dirname, '../files/input/fileWEBM.webm'),
            fileName: 'fileWEBM.webm'
        },
    ];

    Promise.all([
        bootcampController.deleteAudio(videoFiles[0].inputFile, videoFiles[0].fileName),
        bootcampController.deleteAudio(videoFiles[1].inputFile, videoFiles[1].fileName)
    ]).then(() => console.log('Archivos silenciados'))
      .catch(error => console.log(error));
});

//export default bootcampRoute