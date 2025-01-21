import React from 'react';

const CreatingArticleLoader = () => {
    return (
        <div className="creating-loader">
            <div className="loader"></div>
            <span className="loading creating-article-loader">Creating Your Article</span>
        </div>
    );
};

const GettingArticle = () => {
    return (
        <div className="creating-loader">
            <div className="loader"></div>
            <span className="loading creating-article-loader">Getting Article</span>
        </div>
    );
}

export { CreatingArticleLoader,GettingArticle };