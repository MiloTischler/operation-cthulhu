div#message!= messages()


#grid-view
    h3= title
    - each user in users
      div.item
        div.title
            a(href='/users/show/' + user._id)= user.name
        div.buttons
            a(href='/users/edit/' + user._id)
                img(src="/img/edit.png")
            a(href='/users/delete/' + user._id)
                img(src="/img/remove.png")
