import { AppDataSource } from '../db/data-source';
import { RefreshAuth } from '../db/entity/RefreshAuth';
import * as userService from './users.service';
import * as tokenService from './token.service';

export const refreshToken = async (tokenId: string) => {
    const refreshAuthRepository = AppDataSource.getRepository(RefreshAuth);
    const refreshAuth = await refreshAuthRepository.findOneBy({ id: tokenId });
    console.log(refreshAuth?.id);
    if (!refreshAuth || !refreshAuth.valid || !refreshAuth.userId) {
        console.log('refresh auth was null or invalid');
        return undefined;
    }
    const user = await userService.getUser(refreshAuth.userId);
    if (!user) return undefined;
    const newToken = await tokenService.signJwt(user, 'access');
    return newToken;
};
