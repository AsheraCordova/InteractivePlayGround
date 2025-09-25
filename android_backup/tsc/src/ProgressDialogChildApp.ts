//start - import

import { ProgressBar } from './android/widget/ProgressBarImpl';

import { TextView } from './android/widget/TextViewImpl';

//end - import
import { Fragment, Inject } from './app/Fragment';
import { NavController, InjectController } from './navigation/NavController';
import { ScopedObject } from './app/ScopedObject';
declare var downloader: any;
import FragmentFactory from './FragmentFactory';
//start - className
export default class ProgressdialogChildApp extends Fragment
//end - className
{
    //start - body
        @InjectController({})
        navController!: NavController;
        @Inject({ id: "@+id/progress" })

        private progress!:ProgressBar;
@Inject({ id: "@+id/progressText" })

        private progressText!:TextView;


        async goToPreviousScreen() {
            await this.navController.reset().popBackStack().executeCommand();
        }        
        //end - body
    async onCreate() {
        let baseUrl = "http://192.168.1.35:8081";
    	let namespace = "ChildApp";
    
        downloader.init({ folder: namespace, unzip: true });

        let downloadProgress = async (event: any) => {
            let data: any = event.data;
            console.log(JSON.stringify(data));
            this.progress.setProgress(data[0]);
            this.progressText.setText(data[0] + "");
            await this.executeCommand(this.progress, this.progressText);
        };

        let gotFolder = (event: any) => {
            var data = event.data;
            //console.log(JSON.stringify(data));
        };

        let unzipFileEntry = async (event: any) => {
            const url = URL.createObjectURL(event.data.file);
            let nativeUrl = event.data.targetFileEntry.toNativeURL();
            nativeUrl = nativeUrl.substring(nativeUrl.indexOf("persistent/"));
            localStorage.setItem(nativeUrl, url);
            if (nativeUrl.endsWith(".9.png") || nativeUrl.endsWith("_9.png")) {
                const img: any = await this.loadImage(url);
                document.body.appendChild(img);  // or set it elsewhere
                console.log(nativeUrl + " image loaded" + url);
            }

            if (nativeUrl.endsWith("ttf") || nativeUrl.endsWith("otf")) {
                const key = nativeUrl.substring(nativeUrl.lastIndexOf('/') + 1).replaceAll('/', '_').replaceAll(' ', '_').replaceAll('%20', '_').replaceAll('.', '_');
                console.log(key + "font loaded");
                await this.loadFont(key, localStorage.getItem(nativeUrl));
            }

            if (nativeUrl.endsWith(".properties") || nativeUrl.endsWith(".xml") || nativeUrl.endsWith(".css")) {
                const text = await this.readTextFromEntry(event.data.targetFileEntry);
                localStorage.setItem(nativeUrl, text as string);
            }
        };

        let successCallBack = async () => {
            try {
                let js = await this.readCdvDataAsString(`cordova.file.persistent/${namespace}/www/js/index_lite.js`);
                const blob = new Blob([js], { type: 'text/javascript' });
                let blobURL;

                if (js.startsWith("blob:")) {
                    blobURL = js;
                } else {
                    const blob = new Blob([js], { type: 'text/javascript' });
                    blobURL = URL.createObjectURL(blob);
                }

                let module: any;
                try {
                    module = await import(/* webpackIgnore: true */ blobURL);
                } catch (e) {
                    console.error("Error loading module:", e);
                    blobURL = `${baseUrl}/${namespace}/index_lite.js`;
                    try {
                        module = await import(/* webpackIgnore: true */ blobURL);
                    } catch (e) {
                        console.error("Error loading module:", e);
                        throw e;
                    }
                }

                FragmentFactory.registerFragmentMapper(namespace, module.fragmentMapper);
                await new module.AppLoader().loadApp("cordova.file.persistent/${namespace}");
                this.removeListeners(downloadProgress, gotFolder, failureCallBack, successCallBack, unzipFileEntry);
                this.navController.closeDialog().executeCommand();
            } catch (e) {
                this.removeListeners(downloadProgress, gotFolder, failureCallBack, successCallBack, unzipFileEntry);
                await this.navController.closeDialog().executeCommand();
                alert(e + " Error in loading app. Please try again.");
            }
        };

        let failureCallBack = () => {
            this.removeListeners(downloadProgress, gotFolder, failureCallBack, successCallBack, unzipFileEntry);
            this.navController.closeDialog().executeCommand();
        };

        document.addEventListener("DOWNLOADER_downloadProgress", downloadProgress);
        document.addEventListener("DOWNLOADER_gotFolder", gotFolder);
        document.addEventListener("DOWNLOADER_downloadError", failureCallBack);
        document.addEventListener("UNZIP_fileentry", unzipFileEntry);
        document.addEventListener("DOWNLOADER_unzipSuccess", successCallBack);
        downloader.setDownloadError(failureCallBack);
        downloader.get(`${baseUrl}/${namespace}.zip`);
    }


    private removeListeners(downloadProgress: (event: any) => any, gotFolder: (event: any) => void, failureCallBack: any, successCallBack: any, unzipFileEntry: any) {
        document.removeEventListener("DOWNLOADER_downloadProgress", downloadProgress);
        document.removeEventListener("DOWNLOADER_gotFolder", gotFolder);
        document.removeEventListener("DOWNLOADER_downloadSuccess", successCallBack);
        document.removeEventListener("DOWNLOADER_unzipSuccess", successCallBack);
        document.removeEventListener("DOWNLOADER_downloadError", failureCallBack);
        document.removeEventListener("UNZIP_fileEntry", unzipFileEntry);
    }

    async loadFont(name: string, url: string | null) {
        // @ts-ignore
        const font = new FontFace(name, `url(${url})`);
        await font.load();             // Wait until font is downloaded and parsed
        (document as any).fonts.add(font);     // Add to document so it can be used
        console.log(`Font ${name} loaded ${url}`);
    }
    loadImage(url: any) {
        return new Promise((resolve, reject) => {
            const img = new Image();
            img.onload = () => resolve(img);     // âœ… resolve with the image element
            img.onerror = (err) => reject(err);  // â�Œ reject on error
            img.src = url;
            img.id = url;
            img.style.visibility = "hidden";
        });
    }

    getFile(fileEntry: any) {
        return new Promise((resolve, reject) => {
            fileEntry.file(resolve, reject);
        });
    }

    // Read File as text
    readFileAsText(file: any) {
        return new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.onload = () => resolve(reader.result);
            reader.onerror = reject;
            reader.readAsText(file);
        });
    }

    // Usage with async/await
    async readTextFromEntry(fileEntry: any) {
        const file = await this.getFile(fileEntry);
        return await this.readFileAsText(file);
    }

}