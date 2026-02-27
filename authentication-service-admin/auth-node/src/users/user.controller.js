'use strict';

import User from './user.model.js';
import bcrypt from 'bcryptjs';


export const updateProfile = async (req, res) => {
    try {
        const uid = req.user.uid;
        const data = req.body;

        delete data.password;
        delete data.role;

        const updatedUser = await User.findByIdAndUpdate(uid, data, { new: true });

        return res.status(200).json({
            message: 'Perfil actualizado',
            user: updatedUser
        });

    } catch (err) {
        return res.status(500).json({
            message: 'Error actualizando perfil',
            error: err.message
        });
    }
};


export const changePassword = async (req, res) => {
    try {
        const uid = req.user.uid;
        const { oldPassword, newPassword } = req.body;

        const user = await User.findById(uid);

        const validPassword = await bcrypt.compare(oldPassword, user.password);

        if (!validPassword) {
            return res.status(400).json({
                message: 'Contraseña anterior incorrecta'
            });
        }

        const encrypted = await bcrypt.hash(newPassword, 10);

        user.password = encrypted;
        await user.save();

        return res.status(200).json({
            message: 'Contraseña actualizada correctamente'
        });

    } catch (err) {
        return res.status(500).json({
            message: 'Error cambiando contraseña',
            error: err.message
        });
    }
};