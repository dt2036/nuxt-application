const aws = require("aws-sdk");
class BookMyShowDomain {

    getListDatas(params, response) {
        var usersList = [
            {
                "id": 1,
                "name": "Leanne Graham",
                "username": "Bret",
                "email": "Sincere@april.biz",
                "address": {
                    "street": "Kulas Light",
                    "suite": "Apt. 556",
                    "city": "Gwenborough",
                    "zipcode": "92998-3874",
                    "geo": {
                        "lat": "-37.3159",
                        "lng": "81.1496"
                    }
                },
                "phone": "1-770-736-8031 x56442",
                "website": "hildegard.org",
                "company": {
                    "name": "Romaguera-Crona",
                    "catchPhrase": "Multi-layered client-server neural-net",
                    "bs": "harness real-time e-markets"
                }
            },
            {
                "id": 2,
                "name": "Ervin Howell",
                "username": "Antonette",
                "email": "Shanna@melissa.tv",
                "address": {
                    "street": "Victor Plains",
                    "suite": "Suite 879",
                    "city": "Wisokyburgh",
                    "zipcode": "90566-7771",
                    "geo": {
                        "lat": "-43.9509",
                        "lng": "-34.4618"
                    }
                },
                "phone": "010-692-6593 x09125",
                "website": "anastasia.net",
                "company": {
                    "name": "Deckow-Crist",
                    "catchPhrase": "Proactive didactic contingency",
                    "bs": "synergize scalable supply-chains"
                }
            },
            {
                "id": 3,
                "name": "Clementine Bauch",
                "username": "Samantha",
                "email": "Nathan@yesenia.net",
                "address": {
                    "street": "Douglas Extension",
                    "suite": "Suite 847",
                    "city": "McKenziehaven",
                    "zipcode": "59590-4157",
                    "geo": {
                        "lat": "-68.6102",
                        "lng": "-47.0653"
                    }
                },
                "phone": "1-463-123-4447",
                "website": "ramiro.info",
                "company": {
                    "name": "Romaguera-Jacobson",
                    "catchPhrase": "Face to face bifurcated interface",
                    "bs": "e-enable strategic applications"
                }
            },
            {
                "id": 4,
                "name": "Patricia Lebsack",
                "username": "Karianne",
                "email": "Julianne.OConner@kory.org",
                "address": {
                    "street": "Hoeger Mall",
                    "suite": "Apt. 692",
                    "city": "South Elvis",
                    "zipcode": "53919-4257",
                    "geo": {
                        "lat": "29.4572",
                        "lng": "-164.2990"
                    }
                },
                "phone": "493-170-9623 x156",
                "website": "kale.biz",
                "company": {
                    "name": "Robel-Corkery",
                    "catchPhrase": "Multi-tiered zero tolerance productivity",
                    "bs": "transition cutting-edge web services"
                }
            },
            {
                "id": 5,
                "name": "Chelsey Dietrich",
                "username": "Kamren",
                "email": "Lucio_Hettinger@annie.ca",
                "address": {
                    "street": "Skiles Walks",
                    "suite": "Suite 351",
                    "city": "Roscoeview",
                    "zipcode": "33263",
                    "geo": {
                        "lat": "-31.8129",
                        "lng": "62.5342"
                    }
                },
                "phone": "(254)954-1289",
                "website": "demarco.info",
                "company": {
                    "name": "Keebler LLC",
                    "catchPhrase": "User-centric fault-tolerant solution",
                    "bs": "revolutionize end-to-end systems"
                }
            },
            {
                "id": 6,
                "name": "Mrs. Dennis Schulist",
                "username": "Leopoldo_Corkery",
                "email": "Karley_Dach@jasper.info",
                "address": {
                    "street": "Norberto Crossing",
                    "suite": "Apt. 950",
                    "city": "South Christy",
                    "zipcode": "23505-1337",
                    "geo": {
                        "lat": "-71.4197",
                        "lng": "71.7478"
                    }
                },
                "phone": "1-477-935-8478 x6430",
                "website": "ola.org",
                "company": {
                    "name": "Considine-Lockman",
                    "catchPhrase": "Synchronised bottom-line interface",
                    "bs": "e-enable innovative applications"
                }
            },
            {
                "id": 7,
                "name": "Kurtis Weissnat",
                "username": "Elwyn.Skiles",
                "email": "Telly.Hoeger@billy.biz",
                "address": {
                    "street": "Rex Trail",
                    "suite": "Suite 280",
                    "city": "Howemouth",
                    "zipcode": "58804-1099",
                    "geo": {
                        "lat": "24.8918",
                        "lng": "21.8984"
                    }
                },
                "phone": "210.067.6132",
                "website": "elvis.io",
                "company": {
                    "name": "Johns Group",
                    "catchPhrase": "Configurable multimedia task-force",
                    "bs": "generate enterprise e-tailers"
                }
            },
            {
                "id": 8,
                "name": "Nicholas Runolfsdottir V",
                "username": "Maxime_Nienow",
                "email": "Sherwood@rosamond.me",
                "address": {
                    "street": "Ellsworth Summit",
                    "suite": "Suite 729",
                    "city": "Aliyaview",
                    "zipcode": "45169",
                    "geo": {
                        "lat": "-14.3990",
                        "lng": "-120.7677"
                    }
                },
                "phone": "586.493.6943 x140",
                "website": "jacynthe.com",
                "company": {
                    "name": "Abernathy Group",
                    "catchPhrase": "Implemented secondary concept",
                    "bs": "e-enable extensible e-tailers"
                }
            },
            {
                "id": 9,
                "name": "Glenna Reichert",
                "username": "Delphine",
                "email": "Chaim_McDermott@dana.io",
                "address": {
                    "street": "Dayna Park",
                    "suite": "Suite 449",
                    "city": "Bartholomebury",
                    "zipcode": "76495-3109",
                    "geo": {
                        "lat": "24.6463",
                        "lng": "-168.8889"
                    }
                },
                "phone": "(775)976-6794 x41206",
                "website": "conrad.com",
                "company": {
                    "name": "Yost and Sons",
                    "catchPhrase": "Switchable contextually-based project",
                    "bs": "aggregate real-time technologies"
                }
            },
            {
                "id": 10,
                "name": "Clementina DuBuque",
                "username": "Moriah.Stanton",
                "email": "Rey.Padberg@karina.biz",
                "address": {
                    "street": "Kattie Turnpike",
                    "suite": "Suite 198",
                    "city": "Lebsackbury",
                    "zipcode": "31428-2261",
                    "geo": {
                        "lat": "-38.2386",
                        "lng": "57.2232"
                    }
                },
                "phone": "024-648-3804",
                "website": "ambrose.net",
                "company": {
                    "name": "Hoeger LLC",
                    "catchPhrase": "Centralized empowering task-force",
                    "bs": "target end-to-end models"
                }
            }
        ];
        var drawerList = [
            { title: "Home", icon: "mdi-home-city" },
            { title: "My Account", icon: "mdi-account" },
            { title: "Users", icon: "mdi-account-group-outline" },
        ];
        var itemsList = [
            {
                id: 1,
                name: "Applications :",
                children: [
                    { id: 2, name: "Calendar : app" },
                    { id: 3, name: "Chrome : app" },
                    { id: 4, name: "Webstorm : app" },
                ],
            },
            {
                id: 5,
                name: "Documents :",
                children: [
                    {
                        id: 6,
                        name: "vuetify :",
                        children: [
                            {
                                id: 7,
                                name: "src :",
                                children: [
                                    { id: 8, name: "index : ts" },
                                    { id: 9, name: "bootstrap : ts" },
                                ],
                            },
                        ],
                    },
                    {
                        id: 10,
                        name: "material2 :",
                        children: [
                            {
                                id: 11,
                                name: "src :",
                                children: [
                                    { id: 12, name: "v-btn : ts" },
                                    { id: 13, name: "v-card : ts" },
                                    { id: 14, name: "v-window : ts" },
                                ],
                            },
                        ],
                    },
                ],
            },
            {
                id: 15,
                name: "Downloads :",
                children: [
                    { id: 16, name: "October : pdf" },
                    { id: 17, name: "November : pdf" },
                    { id: 18, name: "Tutorial : html" },
                ],
            },
            {
                id: 19,
                name: "Videos :",
                children: [
                    {
                        id: 20,
                        name: "Tutorials :",
                        children: [
                            { id: 21, name: "Basic layouts : mp4" },
                            { id: 22, name: "Advanced techniques : mp4" },
                            { id: 23, name: "All about app : dir" },
                        ],
                    },
                    { id: 24, name: "Intro : mov" },
                    { id: 25, name: "Conference introduction : avi" },
                ],
            },
        ];
        var listItem = [
            {
                id: 1,
                name: "Test1",
                src: "https://cdn.vuetifyjs.com/images/carousel/squirrel.jpg",
                description:
                    "Any or none of these options may be specified to control the size of the image. In the case of images with captions, if the image is already smaller than the requested size, then the image retains its original size (it is not enlarged). In the case of images without captions, the image will be enlarged or reduced to match the requested size. Sizing is disabled when the type 'frame' is used.",
            },
            {
                id: 2,
                name: "Test2",
                src: "https://cdn.vuetifyjs.com/images/carousel/sky.jpg",
                description:
                    "The default thumbnail width can be set in the preferences, so specifying in px is not recommended in order to respect the users' preferences, which may be important for accessibility. Exceptions can, of course, be made, but do try to use upright or the default if possible.",
            },
            {
                name: "Test3",
                src: "https://cdn.vuetifyjs.com/images/carousel/bird.jpg",
                description:
                    "Zero or more of these options may be specified to control the alt text, link title, and caption for the image. Captions may contain embedded wiki markup, such as links or formatting. See Wikipedia:Captions for discussion of appropriate caption text. See Wikipedia:Alternative text for images for discussion of appropriate alt text. Internet Explorer displays the link title as a tooltip but other browsers may not.",
            },
            {
                name: "Test4",
                src: "https://cdn.vuetifyjs.com/images/carousel/planet.jpg",
                description:
                    "Used to insert any HTML classes for image. This has an effect only for some specific classes listed in Wikipedia:Catalogue of CSS classes, or some classes produced by TemplateStyles.",
            },
            {
                name: "Test 5",
                src: "https://homepages.cae.wisc.edu/~ece533/images/airplane.png",
                description: "",
            },
            {
                name: "Test 5",
                src: "https://homepages.cae.wisc.edu/~ece533/images/arctichare.png",
                description: "",
            },
            {
                name: "Test 7",
                src: "https://homepages.cae.wisc.edu/~ece533/images/baboon.png",
                description: "",
            },
            {
                name: "Test 7",
                src: "https://homepages.cae.wisc.edu/~ece533/images/boat.png",
                description: "",
            },
            {
                name: "Test 9",
                src: "https://homepages.cae.wisc.edu/~ece533/images/cat.png",
                description: "",
            },
            {
                name: "Test 10",
                src: "https://homepages.cae.wisc.edu/~ece533/images/fruits.png",
                description: "",
            },
        ];
        var items = [
            {
                name: "Test 1",
                src: "https://cdn.vuetifyjs.com/images/carousel/squirrel.jpg",
                description:
                    "Any or none of these options may be specified to control the size of the image. In the case of images with captions, if the image is already smaller than the requested size, then the image retains its original size (it is not enlarged). In the case of images without captions, the image will be enlarged or reduced to match the requested size. Sizing is disabled when the type 'frame' is used.",
            },
            {
                name: "Test 2",
                src: "https://cdn.vuetifyjs.com/images/carousel/sky.jpg",
                description:
                    "The default thumbnail width can be set in the preferences, so specifying in px is not recommended in order to respect the users' preferences, which may be important for accessibility. Exceptions can, of course, be made, but do try to use upright or the default if possible.",
            },
            {
                name: "Test 3",
                src: "https://cdn.vuetifyjs.com/images/carousel/bird.jpg",
                description:
                    "Zero or more of these options may be specified to control the alt text, link title, and caption for the image. Captions may contain embedded wiki markup, such as links or formatting. See Wikipedia:Captions for discussion of appropriate caption text. See Wikipedia:Alternative text for images for discussion of appropriate alt text. Internet Explorer displays the link title as a tooltip but other browsers may not.",
            },
            {
                name: "Test 4",
                src: "https://cdn.vuetifyjs.com/images/carousel/planet.jpg",
                description:
                    "Used to insert any HTML classes for image. This has an effect only for some specific classes listed in Wikipedia:Catalogue of CSS classes, or some classes produced by TemplateStyles.",
            },
        ];
        var desserts = [
            {
                name: "Frozen Yogurt",
                calories: 159,
                fat: 6.0,
                carbs: 24,
                protein: 4.0,
            },
            {
                name: "Ice cream sandwich",
                calories: 237,
                fat: 9.0,
                carbs: 37,
                protein: 4.3,
            },
            {
                name: "Eclair",
                calories: 262,
                fat: 16.0,
                carbs: 23,
                protein: 6.0,
            },
            {
                name: "Cupcake",
                calories: 305,
                fat: 3.7,
                carbs: 67,
                protein: 4.3,
            },
            {
                name: "Gingerbread",
                calories: 356,
                fat: 16.0,
                carbs: 49,
                protein: 3.9,
            },
            {
                name: "Jelly bean",
                calories: 375,
                fat: 0.0,
                carbs: 94,
                protein: 0.0,
            },
            {
                name: "Lollipop",
                calories: 392,
                fat: 0.2,
                carbs: 98,
                protein: 0,
            },
            {
                name: "Honeycomb",
                calories: 408,
                fat: 3.2,
                carbs: 87,
                protein: 6.5,
            },
            {
                name: "Donut",
                calories: 452,
                fat: 25.0,
                carbs: 51,
                protein: 4.9,
            },
            {
                name: "KitKat",
                calories: 518,
                fat: 26.0,
                carbs: 65,
                protein: 7,
            },
        ];
        var headers = [
            {
                text: "Dessert (100g serving)",
                align: "start",
                sortable: false,
                value: "name",
            },
            { text: "Calories", value: "calories" },
            { text: "Fat (g)", value: "fat" },
            { text: "Carbs (g)", value: "carbs" },
            { text: "Protein (g)", value: "protein" },
            { text: "Actions", value: "actions", sortable: false },
        ];
        var menu = [
            {
                header: true,
                title: "Main Navigation",
                hiddenOnCollapse: true,
            },
            {
                href: "/",
                title: "Dashboard",
                icon: "fa fa-user",
            },
            {
                href: "/charts",
                title: "Charts",
                icon: "fa fa-address-book",
                child: [
                    {
                        href: "/charts/sublink",
                        title: "Sub Link",
                    },
                ],
            },
        ]
        response.json({ drawerList: drawerList, itemsList: itemsList, listItem: listItem, items: items, desserts: desserts, headers: headers, menu: menu, usersList: usersList }
        );
    }

    getById(params, response) {

        var usersList = [
            {
                "id": 1,
                "name": "Leanne Graham",
                "username": "Bret",
                "email": "Sincere@april.biz",
                "address": {
                    "street": "Kulas Light",
                    "suite": "Apt. 556",
                    "city": "Gwenborough",
                    "zipcode": "92998-3874",
                    "geo": {
                        "lat": "-37.3159",
                        "lng": "81.1496"
                    }
                },
                "phone": "1-770-736-8031 x56442",
                "website": "hildegard.org",
                "company": {
                    "name": "Romaguera-Crona",
                    "catchPhrase": "Multi-layered client-server neural-net",
                    "bs": "harness real-time e-markets"
                }
            },
            {
                "id": 2,
                "name": "Ervin Howell",
                "username": "Antonette",
                "email": "Shanna@melissa.tv",
                "address": {
                    "street": "Victor Plains",
                    "suite": "Suite 879",
                    "city": "Wisokyburgh",
                    "zipcode": "90566-7771",
                    "geo": {
                        "lat": "-43.9509",
                        "lng": "-34.4618"
                    }
                },
                "phone": "010-692-6593 x09125",
                "website": "anastasia.net",
                "company": {
                    "name": "Deckow-Crist",
                    "catchPhrase": "Proactive didactic contingency",
                    "bs": "synergize scalable supply-chains"
                }
            },
            {
                "id": 3,
                "name": "Clementine Bauch",
                "username": "Samantha",
                "email": "Nathan@yesenia.net",
                "address": {
                    "street": "Douglas Extension",
                    "suite": "Suite 847",
                    "city": "McKenziehaven",
                    "zipcode": "59590-4157",
                    "geo": {
                        "lat": "-68.6102",
                        "lng": "-47.0653"
                    }
                },
                "phone": "1-463-123-4447",
                "website": "ramiro.info",
                "company": {
                    "name": "Romaguera-Jacobson",
                    "catchPhrase": "Face to face bifurcated interface",
                    "bs": "e-enable strategic applications"
                }
            },
            {
                "id": 4,
                "name": "Patricia Lebsack",
                "username": "Karianne",
                "email": "Julianne.OConner@kory.org",
                "address": {
                    "street": "Hoeger Mall",
                    "suite": "Apt. 692",
                    "city": "South Elvis",
                    "zipcode": "53919-4257",
                    "geo": {
                        "lat": "29.4572",
                        "lng": "-164.2990"
                    }
                },
                "phone": "493-170-9623 x156",
                "website": "kale.biz",
                "company": {
                    "name": "Robel-Corkery",
                    "catchPhrase": "Multi-tiered zero tolerance productivity",
                    "bs": "transition cutting-edge web services"
                }
            },
            {
                "id": 5,
                "name": "Chelsey Dietrich",
                "username": "Kamren",
                "email": "Lucio_Hettinger@annie.ca",
                "address": {
                    "street": "Skiles Walks",
                    "suite": "Suite 351",
                    "city": "Roscoeview",
                    "zipcode": "33263",
                    "geo": {
                        "lat": "-31.8129",
                        "lng": "62.5342"
                    }
                },
                "phone": "(254)954-1289",
                "website": "demarco.info",
                "company": {
                    "name": "Keebler LLC",
                    "catchPhrase": "User-centric fault-tolerant solution",
                    "bs": "revolutionize end-to-end systems"
                }
            },
            {
                "id": 6,
                "name": "Mrs. Dennis Schulist",
                "username": "Leopoldo_Corkery",
                "email": "Karley_Dach@jasper.info",
                "address": {
                    "street": "Norberto Crossing",
                    "suite": "Apt. 950",
                    "city": "South Christy",
                    "zipcode": "23505-1337",
                    "geo": {
                        "lat": "-71.4197",
                        "lng": "71.7478"
                    }
                },
                "phone": "1-477-935-8478 x6430",
                "website": "ola.org",
                "company": {
                    "name": "Considine-Lockman",
                    "catchPhrase": "Synchronised bottom-line interface",
                    "bs": "e-enable innovative applications"
                }
            },
            {
                "id": 7,
                "name": "Kurtis Weissnat",
                "username": "Elwyn.Skiles",
                "email": "Telly.Hoeger@billy.biz",
                "address": {
                    "street": "Rex Trail",
                    "suite": "Suite 280",
                    "city": "Howemouth",
                    "zipcode": "58804-1099",
                    "geo": {
                        "lat": "24.8918",
                        "lng": "21.8984"
                    }
                },
                "phone": "210.067.6132",
                "website": "elvis.io",
                "company": {
                    "name": "Johns Group",
                    "catchPhrase": "Configurable multimedia task-force",
                    "bs": "generate enterprise e-tailers"
                }
            },
            {
                "id": 8,
                "name": "Nicholas Runolfsdottir V",
                "username": "Maxime_Nienow",
                "email": "Sherwood@rosamond.me",
                "address": {
                    "street": "Ellsworth Summit",
                    "suite": "Suite 729",
                    "city": "Aliyaview",
                    "zipcode": "45169",
                    "geo": {
                        "lat": "-14.3990",
                        "lng": "-120.7677"
                    }
                },
                "phone": "586.493.6943 x140",
                "website": "jacynthe.com",
                "company": {
                    "name": "Abernathy Group",
                    "catchPhrase": "Implemented secondary concept",
                    "bs": "e-enable extensible e-tailers"
                }
            },
            {
                "id": 9,
                "name": "Glenna Reichert",
                "username": "Delphine",
                "email": "Chaim_McDermott@dana.io",
                "address": {
                    "street": "Dayna Park",
                    "suite": "Suite 449",
                    "city": "Bartholomebury",
                    "zipcode": "76495-3109",
                    "geo": {
                        "lat": "24.6463",
                        "lng": "-168.8889"
                    }
                },
                "phone": "(775)976-6794 x41206",
                "website": "conrad.com",
                "company": {
                    "name": "Yost and Sons",
                    "catchPhrase": "Switchable contextually-based project",
                    "bs": "aggregate real-time technologies"
                }
            },
            {
                "id": 10,
                "name": "Clementina DuBuque",
                "username": "Moriah.Stanton",
                "email": "Rey.Padberg@karina.biz",
                "address": {
                    "street": "Kattie Turnpike",
                    "suite": "Suite 198",
                    "city": "Lebsackbury",
                    "zipcode": "31428-2261",
                    "geo": {
                        "lat": "-38.2386",
                        "lng": "57.2232"
                    }
                },
                "phone": "024-648-3804",
                "website": "ambrose.net",
                "company": {
                    "name": "Hoeger LLC",
                    "catchPhrase": "Centralized empowering task-force",
                    "bs": "target end-to-end models"
                }
            }
        ];

        var temp1 = Number(params.id);

        var data = usersList.find(function (datas) {
            return datas.id === Number(params.id);
        })
        response.json(data);
        // var data = [{ "isActive": false, "src": "test.jpg", "price": "799,99 �", "ProductName": "Bodytone Ex1" }, { "isActive": false, "src": "test.jpg", "price": "799,99 �", "ProductName": "Bodytone Ex2" }, { "isActive": false, "src": "test.jpg", "price": "799,99 �", "ProductName": "Bodytone Ex3" }]
        // response.json({ Items: [data[parseInt(1) - 1]] });
        //const dynamoDb = new aws.DynamoDB.DocumentClient({ region: "us-east-1" });
        //var expression = {
        //    "TableName": "Products",
        //     "Limit": params.totalCount,
        //};
        //dynamoDb.scan(expression, (error, data) => {
        //    if (error) {
        //        console.error("Unable to read item. Error JSON:", JSON.stringify(error, null, 2));
        //        response.json({ failed: true });
        //    } else {
        //        console.log(data)
        //        response.json(data);
        //    }
        //});
    }
}
module.exports = BookMyShowDomain;