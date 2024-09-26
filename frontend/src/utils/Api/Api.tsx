import image1 from "../../assests/images/image1.jpeg"
import image2 from "../../assests/images/image2.jpeg"
import image3 from "../../assests/images/image3.jpeg"
import image4 from "../../assests/images/image4.jpeg"
import image5 from "../../assests/images/image5.jpeg"

interface Movies {
    id:number;
    image:string;
    name:string;
    description:string;
    releaseDate:string;
}
export const ActionMovie :Movies[] =[
    {
        id:1,
        image:image1,
        name:"The Avenagers",
        description:"Earth's mightiest heroes must come together and learn to fight as a team if they are going to stop the mischievous Loki and his alien army from enslaving humanity.",
        releaseDate:"2/2/2022"
    },
    {
        id:2,
        image:image2,
        name:"Iron Man",
        description:"Iron Man tells the story of Tony Stark, a billionaire industrialist and genius inventor who is kidnapped and forced to build a devastating weapon. Instead, using his intelligence and ingenuity, Tony builds a high-tech suit of armor and escapes captivity.",
        releaseDate:"2/2/2022"
    },
    {
        id:3,
        image:image3,
        name:"Spiderman",
        description:"Peter Parker who gains superhuman abilities after being bitten by a genetically engineered spider. He adopts the masked persona Spider-Man and begins to fight crime in New York City, facing the malevolent Green Goblin in the process.",
        releaseDate:"2/2/2022"
    },
    {
        id:4,
        image:image4,
        name:"Army of the Dead",
        description:"A United States military convoy traveling from Area 51 collides with a car on the highway outside Las Vegas. The convoy's cargo, a zombie, escapes, killing and infecting several soldiers before heading into the city.",
        releaseDate:"2/2/2022"
    },
    {
        id:5,
        image:image5,
        name:"Fighter",
        description:"Fighter is a Hindi language aerial action thriller, a story of top Indian Air Force (IAF) aviators coming together in the face of imminent danger, to battle the country's internal and external forces.",
        releaseDate:"2/2/2022"
    }
]

