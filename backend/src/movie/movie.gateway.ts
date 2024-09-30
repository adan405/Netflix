import { WebSocketGateway, WebSocketServer } from "@nestjs/websockets";
import{Server} from "socket.io"
@WebSocketGateway({
    cors:{
        origin: 'http://localhost:3000',
    credentials: true
    }
})
export class MoviesGateway{
    @WebSocketServer()
    server:Server;

   
}















// Access key: AKIA6D6JBJN5TPKQS5X4
// Secret access key: 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
//amperornetflixclone
