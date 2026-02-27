'use strict';

import Post from './post.model.js';


export const createPost = async (req, res) => {
    try {
        const { title, category, content } = req.body;

        if (!title || !category || !content) {
            return res.status(400).json({ message: 'Campos obligatorios faltantes' });
        }

        const post = new Post({
            title,
            category,
            content,
            author: req.user.uid
        });

        await post.save();

        return res.status(201).json({
            message: 'Publicación creada',
            post
        });

    } catch (err) {
        return res.status(500).json({ message: err.message });
    }
};


export const updatePost = async (req, res) => {
    try {
        const { id } = req.params;
        const post = await Post.findById(id);

        if (!post) return res.status(404).json({ message: 'Post no encontrado' });

        if (post.author.toString() !== req.user.uid) {
            return res.status(403).json({ message: 'No autorizado' });
        }

        const updated = await Post.findByIdAndUpdate(id, req.body, { new: true });

        return res.status(200).json({
            message: 'Post actualizado',
            post: updated
        });

    } catch (err) {
        return res.status(500).json({ message: err.message });
    }
};


export const deletePost = async (req, res) => {
    try {
        const { id } = req.params;
        const post = await Post.findById(id);

        if (!post) return res.status(404).json({ message: 'Post no encontrado' });

        if (post.author.toString() !== req.user.uid) {
            return res.status(403).json({ message: 'No autorizado' });
        }

        await Post.findByIdAndDelete(id);

        return res.status(200).json({
            message: 'Post eliminado'
        });

    } catch (err) {
        return res.status(500).json({ message: err.message });
    }
};