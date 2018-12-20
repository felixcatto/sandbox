import React, { useContext } from 'react';
import context from 'Lib/context';


export default ({ article, comment, type }) => {
  const { urlFor } = useContext(context);
  const action = type === 'edit'
    ? `${urlFor('comment', { articleId: article.id, id: comment.id })}?_method=PUT`
    : `${urlFor('comments', { articleId: article.id })}`;
  const backUrl = type === 'edit'
    ? `${urlFor('article', { id: article.id })}`
    : `${urlFor('articles')}`;

  return (
    <form action={action} method="post">
      <div className="row mb-20">
        <div className="col-6">
          <div className="mb-15">
            <label>Author</label>
            <input type="text" className="form-control" name="author" defaultValue={comment.author}/>
          </div>
          <div>
            <label>Text</label>
            <textarea className="form-control" name="text" defaultValue={comment.text}/>
          </div>
        </div>
      </div>

      <a href={backUrl} className="mr-10">Back</a>
      <button className="btn btn-primary" type="submit">
        {type === 'edit' ? 'Save' : 'Add comment'}
      </button>
    </form>
  );
};
