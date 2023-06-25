import { Controller, Get, Res } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(@Res() res) {
    return this.appService.getHello()
    .then(pdf => {
      res.type('application/pdf');
      res.setHeader('Content-Disposition', `inline; filename=${1}.pdf`);
      res.send(pdf);
    });;
  }
}
