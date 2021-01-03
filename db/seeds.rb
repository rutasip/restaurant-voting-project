restaurants = Restaurant.create([
    { 
      name: "Talutti",
      image_url: "https://talutti.lt/wp-content/themes/talutti/images/pic-logo-2.png"
    }, 
    { 
      name: "Pas Stanley",
      image_url: "http://pas-stanley.com/wp-content/uploads/2016/02/logo2.png"
    },
    { 
      name: "Bernelių Užeiga",
      image_url: "https://berneliuuzeiga.lt/wp-content/uploads/2020/01/BERNELIU_UZEIGA_head.png" 
    }, 
    { 
      name: "Bokštas",
      image_url: "http://www.bajorukiemas.lt/wp-content/uploads/2019/03/BOKŠTO-logotipas.png" 
    }, 
    { 
      name: "Piccola Italia",
      image_url: "https://www.piccolaitalia.lt/wp-content/uploads/2018/12/ristorante_piccola_italia_logo-2-300x260.png" 
    }
  ])

reviews = Review.create([
    { 
        title: 'Puikus restoranas',
        description: 'Labai skaniai pavalgėm',
        score: 5,
        restaurant: restaurants.first 
    },
    { 
        title: 'Neskani lazanija',
        description: 'Man nepatiko',
        score: 1,
        restaurant: restaurants.first 
    } 
])

2.times do |i|
  User.create(email: "user-#{i+1}@example.com", password: "password", password_confirmation: "password")
end