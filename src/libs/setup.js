import Role from '../models/Role';

export const createDefaultRoles = async () => {

    try {
        const count = await Role .estimatedDocumentCount();

        if( count > 0 ) return;

        // Crea roles por defecto
        const roles = await Promise.all([
            new Role({ name: 'superadmin' }).save(),
            new Role({ name: 'admin' }).save(),
            new Role({ name: 'moderator' }).save(),
            new Role({ name: 'user', isDefault: true }).save()
        ]);

        console.log( roles );

    } catch (error) {
        console.error( error );
    }

}
