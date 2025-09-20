import { Component } from '@angular/core';
import { IonicModule, AlertController } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { PostService } from '../../services/post.service';
import { Router } from '@angular/router';
import { CameraService } from '../../services/camera.service'; 

@Component({
  selector: 'app-formulario-aviso',
  templateUrl: './formulario-aviso.page.html',
  styleUrls: ['./formulario-aviso.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule]
})
export class FormularioAvisoPage {
  nuevoAviso = {
    title: '',
    description: '',
    image: ''
  };

  constructor(
    private postService: PostService,
    private alertController: AlertController,
    private router: Router,
    private cameraService: CameraService 
  ) {}

  async tomarFoto() {
    console.log('Tomar foto clicked');
    
    const imageDataUrl = await this.cameraService.takePicture();
    
    if (imageDataUrl) {
      this.nuevoAviso.image = imageDataUrl;
      console.log('Imagen capturada correctamente');
    } else {
      console.log('El usuario canceló la captura');
    }
  }

  async guardarAviso() {
    console.log('Guardar aviso clicked', this.nuevoAviso);
    
    if (this.nuevoAviso.title.length < 5) {
      console.log('Error: título muy corto');
      this.mostrarError('El título debe tener al menos 5 caracteres');
      return;
    }

    if (this.nuevoAviso.description.length < 20) {
      console.log('Error: descripción muy corta');
      this.mostrarError('La descripción debe tener al menos 20 caracteres');
      return;
    }

    try {
      console.log('Intentando guardar...');
      await this.postService.addPost(this.nuevoAviso);
      console.log('Guardado exitoso');
      this.mostrarExito();
      this.router.navigate(['/lista-avisos']);
    } catch (error) {
      console.error('Error al guardar:', error);
      this.mostrarError('Error al guardar la publicación');
    }
  }

  cancelar() {
    console.log('Cancelar clicked');
    this.router.navigate(['/lista-avisos']);
  }

  private async mostrarError(mensaje: string) {
    const alert = await this.alertController.create({
      header: 'Error',
      message: mensaje,
      buttons: ['OK']
    });
    await alert.present();
  }

  private async mostrarExito() {
    const alert = await this.alertController.create({
      header: 'Éxito',
      message: 'Publicación creada correctamente',
      buttons: ['OK']
    });
    await alert.present();
  }
}