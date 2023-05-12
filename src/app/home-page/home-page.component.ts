import { Component } from '@angular/core';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.css'],
})
export class HomePageComponent {
  cardDataList = [
    {
      id:'1',
      imageUrl: 'https://material.angular.io/assets/img/examples/shiba1.jpg',
      title: 'Card 1 Title',
      description: 'Shiba Inu is a popular and beloved breed of dog, originating from Japan. They are known for their distinctive appearance, with a compact and muscular body, fox-like face, and thick coat of fur. Shiba Inus are intelligent, independent, and fiercely loyal to their owners, making them excellent companions for those who are willing to put in the time and effort to train and socialize them properly. They have a high energy level and require plenty of exercise and mental stimulation to stay happy and healthy. Shiba Inus are also known for their strong hunting instincts and may exhibit a tendency to chase small animals,',
    },
    {
      id:'2',
      imageUrl: 'https://material.angular.io/assets/img/examples/shiba2.jpg',
      title: 'Card 2 Title',
      description: 'They are one of the six native Japanese breeds and were originally used for hunting small game, such as birds and rabbits. Shiba Inus are known for their bold and confident nature, which can sometimes come across as aloofness or stubbornness. However, they are also fiercely loyal to their family and have a strong sense of independence, making them excellent watchdogs. ',
    },
    {
      id:'3',
      imageUrl:
        'https://images.pexels.com/photos/194096/pexels-photo-194096.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
      title: 'Card 3 Title',
      description: 'Rock wall, also known as rock climbing wall or indoor climbing wall, is a structure designed to simulate the experience of outdoor rock climbing in an indoor environment. It typically consists of a large vertical or slightly angled wall made up of artificial holds and features, such as ledges, cracks, and overhangs, that allow climbers to navigate up and across the wall. The holds are made of a variety of materials, including plastic, resin, and wood, and are often color-coded to indicate different routes and levels of difficulty. Climbers typically use specialized shoes, harnesses, and ropes to ascend and descend the wall safely.',
    },
    {
      id:'4',
      imageUrl:
        'https://images.pexels.com/photos/1409221/pexels-photo-1409221.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
      title: 'Card 4 Title',
      description: 'Some common sewing stuffs include sewing machines, needles, thread, pins, scissors, measuring tapes, fabric markers, and seam rippers. Sewing machines are electronic or mechanical devices that help to speed up the sewing process and can be used to stitch together fabrics or garments. Needles are used to sew fabric together, while thread is the material used to create the stitch.',
    },
    {
      id:'5',
      imageUrl:
        'https://images.pexels.com/photos/1983840/pexels-photo-1983840.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
      title: 'Card 5 Title',
      description: 'This is card 5 description.',
    },
    {
      id:'6',
      imageUrl:
        'https://images.pexels.com/photos/783590/pexels-photo-783590.jpeg?auto=compress&cs=tinysrgb&w=800',
      title: 'Card 6 Title',
      description: 'This is card 6 description.',
    },
    {
      id:'7',
      imageUrl:
        'https://images.pexels.com/photos/14960025/pexels-photo-14960025.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
      title: 'Card 7 Title',
      description: 'This is card 7 description.',
    },
    {
      id:'8',
      imageUrl:
        'https://images.pexels.com/photos/15658170/pexels-photo-15658170.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
      title: 'Card 8 Title',
      description:
        'A carousel is a type of rotating display that is often used to showcase a collection of images, videos, or other media items. It typically consists of a series of panels or slides that are arranged in a circular or linear pattern, and which rotate automatically or in response to user input. Carousels are commonly used on websites and in mobile apps to highlight featured content or products, or to provide an interactive way for users to browse through a gallery or portfolio. They can be customized with various styles, animations, and navigation controls to create a visually engaging and user-friendly experience. Carousels are a popular design element because they allow for the display of multiple items in a compact and dynamic format, making them an effective tool for presenting content in a way that is both attractive and functional.',
    },
  ];
}
