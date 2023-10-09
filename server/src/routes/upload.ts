import { FastifyInstance } from 'fastify';
import { randomUUID } from 'node:crypto';
import { createWriteStream } from 'node:fs';
import { extname, resolve } from 'node:path';
import { pipeline } from 'node:stream';
import { promisify } from 'node:util';

const pump = promisify(pipeline)

export async function uploadRoutes(app: FastifyInstance) {
    app.post('/upload', async (request, reply) => {
        const file = await request.file({
            limits: {
                fileSize: 5242880
            }
        })

        if (!file) {
            return reply.status(400).send()
        }

        const mimeTypeRegex = /^(image|video)\/[a-zA-Z]+/

        const isValidFileFormat = mimeTypeRegex.test(file.mimetype)

        if (!isValidFileFormat) {
            console.log(file)
            return reply.status(400).send({ message: 'Invalid file format' })
        }

        const fileId = randomUUID()
        const extension = extname(file.filename)

        const fileName = fileId.concat(extension)

        const writeStream = createWriteStream(
            resolve(__dirname, '../../uploads', fileName)
        )

        await pump(file.file, writeStream)

        const fullUrl = request.protocol.concat('://').concat(request.hostname)

        const fileUrl = new URL(`/uploads/${fileName}`, fullUrl).toString()

        return { url: fileUrl }
    })
}