import React, { useContext } from 'react';
import Layout from 'Views/layout';
import { Link } from 'Views/mixins';
import context from 'Lib/context';


export default ({ articles }) => {
  const { urlFor } = useContext(context);
  return (
    <Layout>
      <div className="container">
        <h1>Articles List</h1>

        <a href={urlFor('newArticle')} className="d-inline-block mb-20">
          <button className="btn btn-primary">Create new articles</button>
        </a>

        <table className="table">
          <tr>
            <th>Title</th>
            <th>Text</th>
            <th></th>
          </tr>
          {articles.map(article => (
            <tr key={article.id}>
              <td>{article.title}</td>
              <td>{article.text}</td>
              <td>
                <div className="d-flex justify-content-end">
                  <a href={urlFor('article', { id: article.id })} className="mr-10">
                    <button className="btn btn-sm btn-outline-primary">
                      Show Article
                    </button>
                  </a>
                  <a href={urlFor('editArticle', { id: article.id })} className="mr-10">
                    <button className="btn btn-sm btn-outline-primary">
                      Edit Article
                    </button>
                  </a>
                  <Link action={`${urlFor('article', { id: article.id })}?_method=DELETE`}>
                    <button className="btn btn-sm btn-outline-primary" type="submit">
                      Remove Article
                    </button>
                  </Link>
                </div>
              </td>
            </tr>
          ))}
        </table>
      </div>
    </Layout>
  );
};
