import { UUID } from "crypto";

export interface PayloadToken {
	sub: {
		account: UUID;
		user: UUID;
	};
}
