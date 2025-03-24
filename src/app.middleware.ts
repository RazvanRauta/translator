import { Injectable, Logger, NestMiddleware } from '@nestjs/common';
import { FastifyReply, FastifyRequest } from 'fastify';

@Injectable()
export class LoggerMiddleware implements NestMiddleware {
	private logger = new Logger('HTTPResponse');

	use(
		req: FastifyRequest['raw'],
		res: FastifyReply['raw'],
		next: () => void,
	): void {
		const startAt = process.hrtime();
		const { method, headers } = req;

		res.on('finish', () => {
			const { statusCode } = res;

			const diff = process.hrtime(startAt);
			const responseTime = diff[0] * 1e3 + diff[1] * 1e-6;

			const stringFormat = `"${method} - ${req['url']} - ${
				headers.host
			} - ${statusCode} - ${responseTime.toFixed(2)}ms" - ${
				headers['user-agent']
			} - ${Array.isArray(headers['X-Forwarded-For']) ? headers['X-Forwarded-For'].join(', ') : (headers['X-Forwarded-For'] ?? 'Untrusted')}`;

			if (statusCode >= 500) {
				this.logger.error(stringFormat);
			} else if (statusCode >= 400) {
				this.logger.warn(stringFormat);
			} else {
				this.logger.log(stringFormat);
			}
		});

		next();
	}
}
