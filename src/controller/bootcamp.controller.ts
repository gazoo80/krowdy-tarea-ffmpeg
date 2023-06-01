import axios from 'axios'
import path from 'path'

class BootcampManager {
    getIpUrl: string
    constructor(){
        this.getIpUrl = 'http://api.ipify.org'
    }
    async getSession(){
        try {
            const authResponse = await axios({
                method: 'GET',
                url: this.getIpUrl
            })
            return authResponse?.data
        } catch (error) {
            throw error
        }
    }

    async transformWebmToMp4(inputFile: string) {

        try {
            const outputFile = path.join(__dirname, '../files/output/fileWebmToMp4.mp4');

            const { spawn } = require('node:child_process');
            const ffmpeg = spawn('ffmpeg', ['-i', inputFile, outputFile]);

            ffmpeg.stdout.on('data', (data: any) => {
                console.log(data.toString());
            });

            ffmpeg.stderr.on('data', (data: any) => {
                console.error(data.toString());
            });

            ffmpeg.on('exit', (code: any) => {
                console.log(`Child exited with code ${code}`);
            }); 
        } catch (error) {
            throw error;
        }
    }

    async transformMp4ToWebm(inputFile: string) {

        try {
            const outputFile = path.join(__dirname, '../files/output/fileMp4ToWebm.webm');

            const { spawn } = require('node:child_process');
            const ffmpeg = spawn('ffmpeg', ['-i', inputFile, outputFile]);

            ffmpeg.stdout.on('data', (data: any) => {
                console.log(data.toString());
            });

            ffmpeg.stderr.on('data', (data: any) => {
                console.error(data.toString());
            });

            ffmpeg.on('exit', (code: any) => {
                console.log(`Child exited with code ${code}`);
            }); 
        } catch (error) {
            throw error;
        }
    }

    async deleteAudio(inputFile: string, fileName: string) {

        try {
            const outputFile = path.join(__dirname, `../files/output/NoAudio-${fileName}`);

            const { spawn } = require('node:child_process');
            const ffmpeg = spawn('ffmpeg', ['-i', inputFile, '-an', '-vcodec', 'copy', outputFile]);

            ffmpeg.stdout.on('data', (data: any) => {
                console.log(data.toString());
            });

            ffmpeg.stderr.on('data', (data: any) => {
                console.error(data.toString());
            });

            ffmpeg.on('exit', (code: any) => {
                console.log(`Child exited with code ${code}`);
            }); 
        } catch (error) {
            throw error;
        }
    }
}


export default new BootcampManager