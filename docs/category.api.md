# Design doc

## Category

### API

`/api/v1/category/:id`

returns 
```js
{
    category_id: int
    category_name : string,
    category_description: string,
    total_articles: int,
    articles: list  //Top 5 articles
}

articles model:
{
    article_id: int,
    article_title: string,
    created_time: data_string,
    tags: list[string] 
}

tags model:
{
    tag_id : int,
    tag_name: string
}
```

## Service

- get_articles_by_id (id) 
```
  returns:  artical with tags
```

- get_category_by_id(id)
```
  returns:  category with top 5 articles and their tags
```

- get_categories()
```
  returns category model list
  {
      categories:[
        {    
            category_id: int
            category_name : string,
            category_description: string,
            total_articles: int
        },
        {    
            category_id: int
            category_name : string,
            category_description: string,
            total_articles: int
        }
      ]
  }
```