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
```js
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


## Data Result
```js
[
{
    id: 4,
    name: 'Office',
    status: 1,
    description: 'Office related articles',
    detail:
     { category_id: 4,
       category_name: 'Office',
       category_description: 'Office related articles',
       total_articles: 2,
       articles: [Array] 
    } 
},
{
    id: 5,
    name: 'Databases',
    status: 1,
    description: 'Databases related articles',
    detail:
     { category_id: 5,
       category_name: 'Databases',
       category_description: 'Databases related articles',
       total_articles: 0,
       articles: [] 
     } 
},

]
```