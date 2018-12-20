import React, { useContext } from 'react';
import Layout from 'Views/layout';
import { Link } from 'Views/mixins';
import context from 'Lib/context';
import { emptyObject } from 'Lib/utils';
import Form from '../comments/form';


export default ({ article }) => {
  const { urlFor } = useContext(context);

  return (
    <Layout>
      <div className="container">
        <div className="mb-40">
          <h1>{article.title}</h1>
          <p>{article.text}</p>
        </div>

        <div className="mb-40">
          <h1>Comments</h1>
          {article.comments.map(comment => (
            <React.Fragment key={comment.id}>
              <div className="row mb-5">
                <div className="col-6">
                  <div className="d-flex">
                    <h5 className="mr-10 mb-0">
                      {comment.author}
                    </h5>
                    <div className="d-flex align-items-center">
                      <a
                        className="fa fa-edit fa-control"
                        href={urlFor('editComment', { articleId: article.id, id: comment.id })}
                        title="Edit comment"
                      ></a>
                      <Link
                        action={`${urlFor('comment', { articleId: article.id, id: comment.id })}?_method=delete`}
                      >
                        <button className="fa fa-times fa-control" title="Delete comment"></button>
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
              <p>{comment.text}</p>
            </React.Fragment>
          ))}
        </div>

        <Form article={article} comment={emptyObject}/>

      </div>
    </Layout>
  );
};
