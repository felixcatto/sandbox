import React, { useContext } from 'react';
import context from 'Lib/context';


export default (props) => {
  const { urlFor } = useContext(context);
  const { article, type } = props;
  const action = type === 'edit'
    ? `${urlFor('article', { id: article.id })}?_method=PUT`
    : `${urlFor('articles')}`;

  return (
    <form action={action} method="post">
      <div className="row mb-20">
        <div className="col-6">
          <div className="mb-15">
            <label>Title</label>
            <input type="text" className="form-control" name="title" defaultValue={article.title}/>
          </div>
          <div>
            <label>Text</label>
            <textarea className="form-control" name="text" defaultValue={article.text}/>
          </div>
        </div>
      </div>

      <a href={urlFor('articles')} className="mr-10">Back</a>
      <button className="btn btn-primary" type="submit">Save</button>
    </form>
  );
};
