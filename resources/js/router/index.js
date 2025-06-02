import { createRouter, createWebHistory } from 'vue-router';
import { useTemasStore } from '@/stores/temasStore';

const TemaView = () => import('@/components/Layout/TemaView.vue');
const NotFound = () => import('@/components/Temas/NotFound.vue');

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/',
      redirect: '/temas/bucles/for'
    },
    {
      path: '/temas/:temaId/:subtemaId',
      name: 'tema',
      component: TemaView,
      props: true,
      beforeEnter: (to) => {
        const temasStore = useTemasStore();
        const tema = temasStore.temas.find(t => t.id === to.params.temaId);
        
        if (!tema) return { name: 'not-found' };
        
        const subtema = tema.subtemas.find(s => s.id === to.params.subtemaId);
        if (!subtema) return { name: 'not-found' };
      }
    },
    {
      path: '/:pathMatch(.*)*',
      name: 'not-found',
      component: NotFound
    }
  ]
});

export default router;