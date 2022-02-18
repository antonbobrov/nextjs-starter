import fs from 'fs';
import path from 'path';
import serverSettings from './settings';

/**
 * Remove cached server side props
 */
export default function clearSSPCache () {
    try {
        fs.readdir(serverSettings.cacheDir, (fileError, files) => {
            if (!fileError) {
                files.forEach((file) => {
                    fs.unlink(path.join(serverSettings.cacheDir, file), (err) => {
                        if (err) throw err;
                    });
                });
            }
        });
        return {
            success: true,
        };
    } catch (e) {
        return {
            success: false,
            message: e,
        };
    }
}
