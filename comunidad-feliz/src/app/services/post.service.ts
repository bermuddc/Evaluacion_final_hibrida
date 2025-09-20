import { Injectable } from '@angular/core';
import { Post } from '../models/post.model';

@Injectable({
  providedIn: 'root'
})
export class PostService {
  private posts: Post[] = [];
  private storageKey = 'community-posts';

  constructor() {
    console.log('PostService inicializado');
    this.loadPosts();
  }

  private loadPosts() {
    const storedPosts = localStorage.getItem(this.storageKey);
    console.log('Datos en localStorage:', storedPosts);
    if (storedPosts) {
      this.posts = JSON.parse(storedPosts);
      console.log('Posts cargados:', this.posts);
    }
  }

  private savePosts() {
    console.log('Guardando posts:', this.posts);
    localStorage.setItem(this.storageKey, JSON.stringify(this.posts));
  }

  async getPosts(): Promise<Post[]> {
    console.log('Obteniendo posts');
    return [...this.posts];
  }

  async addPost(postData: { title: string; description: string; image: string }): Promise<Post> {
    console.log('Agregando post:', postData);
    const newPost: Post = {
      ...postData,
      id: Date.now(),
      date: new Date()
    };
    
    this.posts.unshift(newPost);
    this.savePosts();
    console.log('Post agregado:', newPost);
    return newPost;
  }

  async deletePost(id: number): Promise<void> {
    console.log('Eliminando post ID:', id);
    this.posts = this.posts.filter(post => post.id !== id);
    this.savePosts();
  }
}