'use strict';

import Comment from './comment.model.js';


export const createComment = async (req, res) => {
    try {
        const { postId, content } = req.body;

        if (!postId || !content) {
            return res.status(400).json({ message: 'Campos obligatorios faltantes' });
        }

        const comment = new Comment({
            content,
            post: postId,
            author: req.user.uid
        });

        await comment.save();

        return res.status(201).json({
            message: 'Comentario creado',
            comment
        });

    } catch (err) {
        return res.status(500).json({ message: err.message });
    }
};


export const updateComment = async (req, res) => {
    try {
        const { id } = req.params;
        const comment = await Comment.findById(id);

        if (!comment) return res.status(404).json({ message: 'Comentario no encontrado' });

        if (comment.author.toString() !== req.user.uid) {
            return res.status(403).json({ message: 'No autorizado' });
        }

        const updated = await Comment.findByIdAndUpdate(id, req.body, { new: true });

        return res.status(200).json({
            message: 'Comentario actualizado',
            comment: updated
        });

    } catch (err) {
        return res.status(500).json({ message: err.message });
    }
};


export const deleteComment = async (req, res) => {
    try {
        const { id } = req.params;
        const comment = await Comment.findById(id);

        if (!comment) return res.status(404).json({ message: 'Comentario no encontrado' });

        if (comment.author.toString() !== req.user.uid) {
            return res.status(403).json({ message: 'No autorizado' });
        }

        await Comment.findByIdAndDelete(id);

        return res.status(200).json({
            message: 'Comentario eliminado'
        });

    } catch (err) {
        return res.status(500).json({ message: err.message });
    }
};