// const uploader = multer({
//     dest: 'media',
//     limit: {
//         fileSize: 1000000
//     },
//     fileFilter(request, file, callback) {
//         // callback(new Error('File must be a PDF.'))
//         // callback(undefined, true)
//         // callback(undefined, false)
//
//         if (!file.originalname.match(/\.(doc|docx|pdf)$/)){
//             return callback(new Error('Please upload a word document.'))
//         }
//         callback(undefined, true)
//     }
// })

export const option = {
    dest: 'media',
    limit: {
        fileSize: 1000000
    },
    fileFilter(request, file, callback) {
        if (!file.originalname.match()){
            return callback(new Error('Invalid File format submitted.'))
        }

        callback(undefined, true)
    }
}