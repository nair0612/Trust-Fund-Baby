import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { CampaignconnectionService } from '../services/campaignconnection.service';
import { ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-all-campaign',
  templateUrl: './all-campaign.component.html',
  styleUrls: ['./all-campaign.component.css'],
})
export class AllCampaignComponent {

  data: any;

  cardDataList = [
    {
      id: '1',
      imageUrl: 'https://material.angular.io/assets/img/examples/shiba1.jpg',
      title: 'Shiba Inu',
      description:
        'Shiba Inu is a popular and beloved breed of dog, originating from Japan. They are known for their distinctive appearance, with a compact and muscular body, fox-like face, and thick coat of fur. Shiba Inus are intelligent, independent, and fiercely loyal to their owners, making them excellent companions for those who are willing to put in the time and effort to train and socialize them properly. They have a high energy level and require plenty of exercise and mental stimulation to stay happy and healthy. Shiba Inus are also known for their strong hunting instincts and may exhibit a tendency to chase small animals,',
    },
    {
      id: '2',
      imageUrl: 'https://material.angular.io/assets/img/examples/shiba2.jpg',
      title: 'Shiba Inu',
      description:
        'They are one of the six native Japanese breeds and were originally used for hunting small game, such as birds and rabbits. Shiba Inus are known for their bold and confident nature, which can sometimes come across as aloofness or stubbornness. However, they are also fiercely loyal to their family and have a strong sense of independence, making them excellent watchdogs. ',
    },
    {
      id: '3',
      imageUrl:
        'https://images.pexels.com/photos/194096/pexels-photo-194096.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
      title: 'Rock Wall',
      description:
        'Rock wall, also known as rock climbing wall or indoor climbing wall, is a structure designed to simulate the experience of outdoor rock climbing in an indoor environment. It typically consists of a large vertical or slightly angled wall made up of artificial holds and features, such as ledges, cracks, and overhangs, that allow climbers to navigate up and across the wall. The holds are made of a variety of materials, including plastic, resin, and wood, and are often color-coded to indicate different routes and levels of difficulty. Climbers typically use specialized shoes, harnesses, and ropes to ascend and descend the wall safely.',
    },
    {
      id: '4',
      imageUrl:
        'https://images.pexels.com/photos/1409221/pexels-photo-1409221.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
      title: 'Sewing Stuff',
      description:
        'Some common sewing stuffs include sewing machines, needles, thread, pins, scissors, measuring tapes, fabric markers, and seam rippers. Sewing machines are electronic or mechanical devices that help to speed up the sewing process and can be used to stitch together fabrics or garments. Needles are used to sew fabric together, while thread is the material used to create the stitch.',
    },
    {
      id: '5',
      imageUrl:
        'https://images.pexels.com/photos/1983840/pexels-photo-1983840.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
      title: 'Dark Workshop',
      description:
        'Dark workshops are often used for activities such as photography, film development, printmaking, and other processes that require careful control of light and exposure. The lighting in a dark workshop is often provided by specialized lamps or bulbs that emit a low-level, non-UV light that is conducive to the creative process. Other features of a dark workshop may include specialized ventilation systems to control fumes and odors, sound insulation to reduce noise, and ample workspace and storage areas for tools, materials, and equipment.',
    },
    {
      id: '6',
      imageUrl:
        'https://images.pexels.com/photos/783590/pexels-photo-783590.jpeg?auto=compress&cs=tinysrgb&w=800',
      title: 'Sewing Machine',
      description:
        'A sewing machine is a specialized mechanical or electronic device that is used to join two or more pieces of fabric together with a stitch. It consists of a base or frame, a needle, a thread spool, and a bobbin, which all work together to create the stitch. The needle is the primary tool that pierces the fabric and creates the stitch, while the thread spool and bobbin supply the thread needed to make the stitch. ',
    },
    {
      id: '7',
      imageUrl:
        'https://images.pexels.com/photos/14960025/pexels-photo-14960025.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
      title: 'Colosseo',
      description:
        'Colosseo, also known as the Colosseum or the Flavian Amphitheatre, is an ancient amphitheater located in Rome, Italy. It was built in the first century AD and is considered one of the greatest architectural and engineering feats of the ancient world. The Colosseo was originally used for gladiatorial contests and public spectacles, such as animal hunts and mock sea battles.',
    },
    {
      id: '8',
      imageUrl:
        'https://images.pexels.com/photos/15658170/pexels-photo-15658170.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
      title: 'Cliff View',
      description:
        'The view from a cliff can be awe-inspiring, offering a panoramic vista that stretches for miles in every direction. Depending on the location, a cliff view may include a range of features, such as rugged mountains, rolling hills, sparkling bodies of water, lush forests, and open plains. ',
    },
    {
      id: '1',
      imageUrl: 'https://material.angular.io/assets/img/examples/shiba1.jpg',
      title: 'Shiba Inu',
      description:
        'Shiba Inu is a popular and beloved breed of dog, originating from Japan. They are known for their distinctive appearance, with a compact and muscular body, fox-like face, and thick coat of fur. Shiba Inus are intelligent, independent, and fiercely loyal to their owners, making them excellent companions for those who are willing to put in the time and effort to train and socialize them properly. They have a high energy level and require plenty of exercise and mental stimulation to stay happy and healthy. Shiba Inus are also known for their strong hunting instincts and may exhibit a tendency to chase small animals,',
    },
    {
      id: '2',
      imageUrl: 'https://material.angular.io/assets/img/examples/shiba2.jpg',
      title: 'Shiba Inu',
      description:
        'They are one of the six native Japanese breeds and were originally used for hunting small game, such as birds and rabbits. Shiba Inus are known for their bold and confident nature, which can sometimes come across as aloofness or stubbornness. However, they are also fiercely loyal to their family and have a strong sense of independence, making them excellent watchdogs. ',
    },
    {
      id: '3',
      imageUrl:
        'https://images.pexels.com/photos/194096/pexels-photo-194096.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
      title: 'Rock Wall',
      description:
        'Rock wall, also known as rock climbing wall or indoor climbing wall, is a structure designed to simulate the experience of outdoor rock climbing in an indoor environment. It typically consists of a large vertical or slightly angled wall made up of artificial holds and features, such as ledges, cracks, and overhangs, that allow climbers to navigate up and across the wall. The holds are made of a variety of materials, including plastic, resin, and wood, and are often color-coded to indicate different routes and levels of difficulty. Climbers typically use specialized shoes, harnesses, and ropes to ascend and descend the wall safely.',
    },
    {
      id: '4',
      imageUrl:
        'https://images.pexels.com/photos/1409221/pexels-photo-1409221.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
      title: 'Sewing Stuff',
      description:
        'Some common sewing stuffs include sewing machines, needles, thread, pins, scissors, measuring tapes, fabric markers, and seam rippers. Sewing machines are electronic or mechanical devices that help to speed up the sewing process and can be used to stitch together fabrics or garments. Needles are used to sew fabric together, while thread is the material used to create the stitch.',
    },
    {
      id: '5',
      imageUrl:
        'https://images.pexels.com/photos/1983840/pexels-photo-1983840.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
      title: 'Dark Workshop',
      description:
        'Dark workshops are often used for activities such as photography, film development, printmaking, and other processes that require careful control of light and exposure. The lighting in a dark workshop is often provided by specialized lamps or bulbs that emit a low-level, non-UV light that is conducive to the creative process. Other features of a dark workshop may include specialized ventilation systems to control fumes and odors, sound insulation to reduce noise, and ample workspace and storage areas for tools, materials, and equipment.',
    },
    {
      id: '6',
      imageUrl:
        'https://images.pexels.com/photos/783590/pexels-photo-783590.jpeg?auto=compress&cs=tinysrgb&w=800',
      title: 'Sewing Machine',
      description:
        'A sewing machine is a specialized mechanical or electronic device that is used to join two or more pieces of fabric together with a stitch. It consists of a base or frame, a needle, a thread spool, and a bobbin, which all work together to create the stitch. The needle is the primary tool that pierces the fabric and creates the stitch, while the thread spool and bobbin supply the thread needed to make the stitch. ',
    },
    {
      id: '7',
      imageUrl:
        'https://images.pexels.com/photos/14960025/pexels-photo-14960025.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
      title: 'Colosseo',
      description:
        'Colosseo, also known as the Colosseum or the Flavian Amphitheatre, is an ancient amphitheater located in Rome, Italy. It was built in the first century AD and is considered one of the greatest architectural and engineering feats of the ancient world. The Colosseo was originally used for gladiatorial contests and public spectacles, such as animal hunts and mock sea battles.',
    },
    {
      id: '8',
      imageUrl:
        'https://images.pexels.com/photos/15658170/pexels-photo-15658170.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
      title: 'Cliff View',
      description:
        'The view from a cliff can be awe-inspiring, offering a panoramic vista that stretches for miles in every direction. Depending on the location, a cliff view may include a range of features, such as rugged mountains, rolling hills, sparkling bodies of water, lush forests, and open plains. ',
    },
    {
      id: '1',
      imageUrl: 'https://material.angular.io/assets/img/examples/shiba1.jpg',
      title: 'Shiba Inu',
      description:
        'Shiba Inu is a popular and beloved breed of dog, originating from Japan. They are known for their distinctive appearance, with a compact and muscular body, fox-like face, and thick coat of fur. Shiba Inus are intelligent, independent, and fiercely loyal to their owners, making them excellent companions for those who are willing to put in the time and effort to train and socialize them properly. They have a high energy level and require plenty of exercise and mental stimulation to stay happy and healthy. Shiba Inus are also known for their strong hunting instincts and may exhibit a tendency to chase small animals,',
    },
    {
      id: '2',
      imageUrl: 'https://material.angular.io/assets/img/examples/shiba2.jpg',
      title: 'Shiba Inu',
      description:
        'They are one of the six native Japanese breeds and were originally used for hunting small game, such as birds and rabbits. Shiba Inus are known for their bold and confident nature, which can sometimes come across as aloofness or stubbornness. However, they are also fiercely loyal to their family and have a strong sense of independence, making them excellent watchdogs. ',
    },
    {
      id: '3',
      imageUrl:
        'https://images.pexels.com/photos/194096/pexels-photo-194096.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
      title: 'Rock Wall',
      description:
        'Rock wall, also known as rock climbing wall or indoor climbing wall, is a structure designed to simulate the experience of outdoor rock climbing in an indoor environment. It typically consists of a large vertical or slightly angled wall made up of artificial holds and features, such as ledges, cracks, and overhangs, that allow climbers to navigate up and across the wall. The holds are made of a variety of materials, including plastic, resin, and wood, and are often color-coded to indicate different routes and levels of difficulty. Climbers typically use specialized shoes, harnesses, and ropes to ascend and descend the wall safely.',
    },
    {
      id: '4',
      imageUrl:
        'https://images.pexels.com/photos/1409221/pexels-photo-1409221.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
      title: 'Sewing Stuff',
      description:
        'Some common sewing stuffs include sewing machines, needles, thread, pins, scissors, measuring tapes, fabric markers, and seam rippers. Sewing machines are electronic or mechanical devices that help to speed up the sewing process and can be used to stitch together fabrics or garments. Needles are used to sew fabric together, while thread is the material used to create the stitch.',
    },
    {
      id: '5',
      imageUrl:
        'https://images.pexels.com/photos/1983840/pexels-photo-1983840.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
      title: 'Dark Workshop',
      description:
        'Dark workshops are often used for activities such as photography, film development, printmaking, and other processes that require careful control of light and exposure. The lighting in a dark workshop is often provided by specialized lamps or bulbs that emit a low-level, non-UV light that is conducive to the creative process. Other features of a dark workshop may include specialized ventilation systems to control fumes and odors, sound insulation to reduce noise, and ample workspace and storage areas for tools, materials, and equipment.',
    },
    {
      id: '6',
      imageUrl:
        'https://images.pexels.com/photos/783590/pexels-photo-783590.jpeg?auto=compress&cs=tinysrgb&w=800',
      title: 'Sewing Machine',
      description:
        'A sewing machine is a specialized mechanical or electronic device that is used to join two or more pieces of fabric together with a stitch. It consists of a base or frame, a needle, a thread spool, and a bobbin, which all work together to create the stitch. The needle is the primary tool that pierces the fabric and creates the stitch, while the thread spool and bobbin supply the thread needed to make the stitch. ',
    },
    {
      id: '7',
      imageUrl:
        'https://images.pexels.com/photos/14960025/pexels-photo-14960025.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
      title: 'Colosseo',
      description:
        'Colosseo, also known as the Colosseum or the Flavian Amphitheatre, is an ancient amphitheater located in Rome, Italy. It was built in the first century AD and is considered one of the greatest architectural and engineering feats of the ancient world. The Colosseo was originally used for gladiatorial contests and public spectacles, such as animal hunts and mock sea battles.',
    },
    {
      id: '8',
      imageUrl:
        'https://images.pexels.com/photos/15658170/pexels-photo-15658170.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
      title: 'Cliff View',
      description:
        'The view from a cliff can be awe-inspiring, offering a panoramic vista that stretches for miles in every direction. Depending on the location, a cliff view may include a range of features, such as rugged mountains, rolling hills, sparkling bodies of water, lush forests, and open plains. ',
    },
    {
      id: '1',
      imageUrl: 'https://material.angular.io/assets/img/examples/shiba1.jpg',
      title: 'Shiba Inu',
      description:
        'Shiba Inu is a popular and beloved breed of dog, originating from Japan. They are known for their distinctive appearance, with a compact and muscular body, fox-like face, and thick coat of fur. Shiba Inus are intelligent, independent, and fiercely loyal to their owners, making them excellent companions for those who are willing to put in the time and effort to train and socialize them properly. They have a high energy level and require plenty of exercise and mental stimulation to stay happy and healthy. Shiba Inus are also known for their strong hunting instincts and may exhibit a tendency to chase small animals,',
    },
    {
      id: '2',
      imageUrl: 'https://material.angular.io/assets/img/examples/shiba2.jpg',
      title: 'Shiba Inu',
      description:
        'They are one of the six native Japanese breeds and were originally used for hunting small game, such as birds and rabbits. Shiba Inus are known for their bold and confident nature, which can sometimes come across as aloofness or stubbornness. However, they are also fiercely loyal to their family and have a strong sense of independence, making them excellent watchdogs. ',
    },
    {
      id: '3',
      imageUrl:
        'https://images.pexels.com/photos/194096/pexels-photo-194096.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
      title: 'Rock Wall',
      description:
        'Rock wall, also known as rock climbing wall or indoor climbing wall, is a structure designed to simulate the experience of outdoor rock climbing in an indoor environment. It typically consists of a large vertical or slightly angled wall made up of artificial holds and features, such as ledges, cracks, and overhangs, that allow climbers to navigate up and across the wall. The holds are made of a variety of materials, including plastic, resin, and wood, and are often color-coded to indicate different routes and levels of difficulty. Climbers typically use specialized shoes, harnesses, and ropes to ascend and descend the wall safely.',
    },
    {
      id: '4',
      imageUrl:
        'https://images.pexels.com/photos/1409221/pexels-photo-1409221.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
      title: 'Sewing Stuff',
      description:
        'Some common sewing stuffs include sewing machines, needles, thread, pins, scissors, measuring tapes, fabric markers, and seam rippers. Sewing machines are electronic or mechanical devices that help to speed up the sewing process and can be used to stitch together fabrics or garments. Needles are used to sew fabric together, while thread is the material used to create the stitch.',
    },
    {
      id: '5',
      imageUrl:
        'https://images.pexels.com/photos/1983840/pexels-photo-1983840.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
      title: 'Dark Workshop',
      description:
        'Dark workshops are often used for activities such as photography, film development, printmaking, and other processes that require careful control of light and exposure. The lighting in a dark workshop is often provided by specialized lamps or bulbs that emit a low-level, non-UV light that is conducive to the creative process. Other features of a dark workshop may include specialized ventilation systems to control fumes and odors, sound insulation to reduce noise, and ample workspace and storage areas for tools, materials, and equipment.',
    },
    {
      id: '6',
      imageUrl:
        'https://images.pexels.com/photos/783590/pexels-photo-783590.jpeg?auto=compress&cs=tinysrgb&w=800',
      title: 'Sewing Machine',
      description:
        'A sewing machine is a specialized mechanical or electronic device that is used to join two or more pieces of fabric together with a stitch. It consists of a base or frame, a needle, a thread spool, and a bobbin, which all work together to create the stitch. The needle is the primary tool that pierces the fabric and creates the stitch, while the thread spool and bobbin supply the thread needed to make the stitch. ',
    },
    {
      id: '7',
      imageUrl:
        'https://images.pexels.com/photos/14960025/pexels-photo-14960025.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
      title: 'Colosseo',
      description:
        'Colosseo, also known as the Colosseum or the Flavian Amphitheatre, is an ancient amphitheater located in Rome, Italy. It was built in the first century AD and is considered one of the greatest architectural and engineering feats of the ancient world. The Colosseo was originally used for gladiatorial contests and public spectacles, such as animal hunts and mock sea battles.',
    },
    {
      id: '8',
      imageUrl:
        'https://images.pexels.com/photos/15658170/pexels-photo-15658170.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
      title: 'Cliff View',
      description:
        'The view from a cliff can be awe-inspiring, offering a panoramic vista that stretches for miles in every direction. Depending on the location, a cliff view may include a range of features, such as rugged mountains, rolling hills, sparkling bodies of water, lush forests, and open plains. ',
    },
    {
      id: '1',
      imageUrl: 'https://material.angular.io/assets/img/examples/shiba1.jpg',
      title: 'Shiba Inu',
      description:
        'Shiba Inu is a popular and beloved breed of dog, originating from Japan. They are known for their distinctive appearance, with a compact and muscular body, fox-like face, and thick coat of fur. Shiba Inus are intelligent, independent, and fiercely loyal to their owners, making them excellent companions for those who are willing to put in the time and effort to train and socialize them properly. They have a high energy level and require plenty of exercise and mental stimulation to stay happy and healthy. Shiba Inus are also known for their strong hunting instincts and may exhibit a tendency to chase small animals,',
    },
    {
      id: '2',
      imageUrl: 'https://material.angular.io/assets/img/examples/shiba2.jpg',
      title: 'Shiba Inu',
      description:
        'They are one of the six native Japanese breeds and were originally used for hunting small game, such as birds and rabbits. Shiba Inus are known for their bold and confident nature, which can sometimes come across as aloofness or stubbornness. However, they are also fiercely loyal to their family and have a strong sense of independence, making them excellent watchdogs. ',
    },
    {
      id: '3',
      imageUrl:
        'https://images.pexels.com/photos/194096/pexels-photo-194096.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
      title: 'Rock Wall',
      description:
        'Rock wall, also known as rock climbing wall or indoor climbing wall, is a structure designed to simulate the experience of outdoor rock climbing in an indoor environment. It typically consists of a large vertical or slightly angled wall made up of artificial holds and features, such as ledges, cracks, and overhangs, that allow climbers to navigate up and across the wall. The holds are made of a variety of materials, including plastic, resin, and wood, and are often color-coded to indicate different routes and levels of difficulty. Climbers typically use specialized shoes, harnesses, and ropes to ascend and descend the wall safely.',
    },
    {
      id: '4',
      imageUrl:
        'https://images.pexels.com/photos/1409221/pexels-photo-1409221.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
      title: 'Sewing Stuff',
      description:
        'Some common sewing stuffs include sewing machines, needles, thread, pins, scissors, measuring tapes, fabric markers, and seam rippers. Sewing machines are electronic or mechanical devices that help to speed up the sewing process and can be used to stitch together fabrics or garments. Needles are used to sew fabric together, while thread is the material used to create the stitch.',
    },
    {
      id: '5',
      imageUrl:
        'https://images.pexels.com/photos/1983840/pexels-photo-1983840.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
      title: 'Dark Workshop',
      description:
        'Dark workshops are often used for activities such as photography, film development, printmaking, and other processes that require careful control of light and exposure. The lighting in a dark workshop is often provided by specialized lamps or bulbs that emit a low-level, non-UV light that is conducive to the creative process. Other features of a dark workshop may include specialized ventilation systems to control fumes and odors, sound insulation to reduce noise, and ample workspace and storage areas for tools, materials, and equipment.',
    },
    {
      id: '6',
      imageUrl:
        'https://images.pexels.com/photos/783590/pexels-photo-783590.jpeg?auto=compress&cs=tinysrgb&w=800',
      title: 'Sewing Machine',
      description:
        'A sewing machine is a specialized mechanical or electronic device that is used to join two or more pieces of fabric together with a stitch. It consists of a base or frame, a needle, a thread spool, and a bobbin, which all work together to create the stitch. The needle is the primary tool that pierces the fabric and creates the stitch, while the thread spool and bobbin supply the thread needed to make the stitch. ',
    },
    {
      id: '7',
      imageUrl:
        'https://images.pexels.com/photos/14960025/pexels-photo-14960025.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
      title: 'Colosseo',
      description:
        'Colosseo, also known as the Colosseum or the Flavian Amphitheatre, is an ancient amphitheater located in Rome, Italy. It was built in the first century AD and is considered one of the greatest architectural and engineering feats of the ancient world. The Colosseo was originally used for gladiatorial contests and public spectacles, such as animal hunts and mock sea battles.',
    },
    {
      id: '8',
      imageUrl:
        'https://images.pexels.com/photos/15658170/pexels-photo-15658170.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
      title: 'Cliff View',
      description:
        'The view from a cliff can be awe-inspiring, offering a panoramic vista that stretches for miles in every direction. Depending on the location, a cliff view may include a range of features, such as rugged mountains, rolling hills, sparkling bodies of water, lush forests, and open plains. ',
    },
  ];

  searchText: string = '';

  visibleCardDataList = this.cardDataList.slice(0, 12);

  constructor(
    private route: ActivatedRoute,
    private campaignConnectionService: CampaignconnectionService
  ) {}

  ngOnInit(): void {
    // this.campaignId = this.route.snapshot.url[1].path;
    // console.log('campaignId:', this.campaignId);
    this.getAllCampaign();
  }

  showMore() {
    const currentLength = this.visibleCardDataList.length;
    const regex = new RegExp(this.searchText, 'i'); // 'i' flag for case-insensitive search
    const nextItems = this.cardDataList
      .filter((item) => regex.test(item.title)) // Non-specific search using regular expression
      .slice(currentLength, currentLength + 12);
    this.visibleCardDataList = this.visibleCardDataList.concat(nextItems);
  }


  onSearchTextEntered(searchValue: string) {
    this.searchText = searchValue;
    const regex = new RegExp(this.searchText, 'i'); // 'i' flag for case-insensitive search
    this.visibleCardDataList = this.cardDataList
      .filter((item) => regex.test(item.title)) // Non-specific search using regular expression
      .slice(0, 12); // Reset visibleCardDataList with filtered results
    console.log(this.searchText);
  }

  getAllCampaign() {
    this.campaignConnectionService.getAllCampaign().subscribe((result) => {
      this.data = result;
    });
  }

}
