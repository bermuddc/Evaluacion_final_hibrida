import { Component, OnInit } from '@angular/core';
import { IonicModule, AlertController } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { PostService } from '../../services/post.service';
import { Post } from '../../models/post.model';
import { Router } from '@angular/router';
import { DateFormatPipe } from '../../pipes/date-format.pipe'; 

@Component({
  selector: 'app-lista-avisos',
  templateUrl: './lista-avisos.page.html',
  styleUrls: ['./lista-avisos.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, DateFormatPipe] 
})
export class ListaAvisosPage implements OnInit {
  posts: Post[] = [];

  constructor(
    private postService: PostService,
    private alertController: AlertController,
    private router: Router
  ) {}

  async ngOnInit() {
    await this.loadPosts();
  }

  async loadPosts() {
    this.posts = await this.postService.getPosts();
  }

  async deletePost(post: Post) {
    const alert = await this.alertController.create({
      header: 'Confirmar Eliminación',
      message: `¿Estás seguro de eliminar "${post.title}"?`,
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel'
        },
        {
          text: 'Eliminar',
          handler: async () => {
            if (post.id) {
              await this.postService.deletePost(post.id);
              await this.loadPosts();
            }
          }
        }
      ]
    });

    await alert.present();
  }

  
  navigateToForm() {
    this.router.navigate(['/formulario-aviso']);
  }
}