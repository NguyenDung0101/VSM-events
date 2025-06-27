class ArticleController {
    constructor(ArticleModel) {
        this.ArticleModel = ArticleModel;
    }

    async createArticle(req, res) {
        try {
            const article = new this.ArticleModel(req.body);
            await article.save();
            res.status(201).json(article);
        } catch (error) {
            res.status(400).json({ message: error.message });
        }
    }

    async getAllArticles(req, res) {
        try {
            const articles = await this.ArticleModel.find();
            res.status(200).json(articles);
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    }

    async getArticleById(req, res) {
        try {
            const article = await this.ArticleModel.findById(req.params.id);
            if (!article) {
                return res.status(404).json({ message: 'Article not found' });
            }
            res.status(200).json(article);
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    }

    async updateArticle(req, res) {
        try {
            const article = await this.ArticleModel.findByIdAndUpdate(req.params.id, req.body, { new: true });
            if (!article) {
                return res.status(404).json({ message: 'Article not found' });
            }
            res.status(200).json(article);
        } catch (error) {
            res.status(400).json({ message: error.message });
        }
    }

    async deleteArticle(req, res) {
        try {
            const article = await this.ArticleModel.findByIdAndDelete(req.params.id);
            if (!article) {
                return res.status(404).json({ message: 'Article not found' });
            }
            res.status(204).send();
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    }
}

export default ArticleController;