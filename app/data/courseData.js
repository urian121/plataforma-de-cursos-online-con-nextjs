// Datos del curso con videos reales de YouTube
// IMPORTANTE: Estos son videos de ejemplo. Reemplázalos con tus propios videos.
// Para obtener los IDs de tu playlist, usa el script: node scripts/getPlaylistVideos.js

export const courseData = {
  title: "Curso Completo de Marca Personal",
  subtitle: "Aprende a construir tu marca personal desde cero",
  progress: 15,
  playlistId: "PLAA-ekj37481-pAucmr9FRhFwMCr7zNDX", // Reemplaza con tu playlist ID
  sections: [
    {
      name: "Fundamentos de Marca Personal",
      lessons: [
        {
          id: 1,
          title: "Introducción a la Marca Personal",
          duration: "10:45",
          completed: true,
          videoId: "jNQXAC9IVRw", // Video de prueba - Reemplaza con tu video
          thumbnail: `https://img.youtube.com/vi/jNQXAC9IVRw/mqdefault.jpg`
        },
        {
          id: 2,
          title: "Definiendo tu Propuesta de Valor",
          duration: "12:30",
          completed: true,
          videoId: "ScMzIvxBSi4", // Video de prueba - Reemplaza con tu video
          thumbnail: `https://img.youtube.com/vi/ScMzIvxBSi4/mqdefault.jpg`
        },
        {
          id: 3,
          title: "Identifica tu Audiencia Objetivo",
          duration: "08:20",
          completed: false,
          videoId: "OPf0YbXqDm0", // Video de prueba - Reemplaza con tu video
          thumbnail: `https://img.youtube.com/vi/OPf0YbXqDm0/mqdefault.jpg`
        },
        {
          id: 4,
          title: "Construyendo tu Mensaje de Marca",
          duration: "15:45",
          completed: false,
          videoId: "9No-FiEInLA", // Video de prueba - Reemplaza con tu video
          thumbnail: `https://img.youtube.com/vi/9No-FiEInLA/mqdefault.jpg`
        }
      ]
    },
    {
      name: "Estrategia Digital",
      lessons: [
        {
          id: 5,
          title: "Presencia en Redes Sociales",
          duration: "14:20",
          completed: false,
          videoId: "FTQbiNvZqaY", // Video de prueba - Reemplaza con tu video
          thumbnail: `https://img.youtube.com/vi/FTQbiNvZqaY/mqdefault.jpg`
        },
        {
          id: 6,
          title: "Creación de Contenido de Valor",
          duration: "18:30",
          completed: false,
          videoId: "2Xc9gXyf2G4", // Video de prueba - Reemplaza con tu video
          thumbnail: `https://img.youtube.com/vi/2Xc9gXyf2G4/mqdefault.jpg`
        },
        {
          id: 7,
          title: "LinkedIn para Profesionales",
          duration: "16:45",
          completed: false,
          videoId: "kxopViU98Xo", // Video de prueba - Reemplaza con tu video
          thumbnail: `https://img.youtube.com/vi/kxopViU98Xo/mqdefault.jpg`
        }
      ]
    },
    {
      name: "Crecimiento y Monetización",
      lessons: [
        {
          id: 8,
          title: "Estrategias de Crecimiento Orgánico",
          duration: "20:15",
          completed: false,
          videoId: "6stlCkUDG_s", // Video de prueba - Reemplaza con tu video
          thumbnail: `https://img.youtube.com/vi/6stlCkUDG_s/mqdefault.jpg`
        },
        {
          id: 9,
          title: "Monetiza tu Marca Personal",
          duration: "22:40",
          completed: false,
          videoId: "gCzkaGtZAc4", // Video de prueba - Reemplaza con tu video
          thumbnail: `https://img.youtube.com/vi/gCzkaGtZAc4/mqdefault.jpg`
        },
        {
          id: 10,
          title: "Construcción de Comunidad",
          duration: "17:30",
          completed: false,
          videoId: "RBSGKlAvoiM", // Video de prueba - Reemplaza con tu video
          thumbnail: `https://img.youtube.com/vi/RBSGKlAvoiM/mqdefault.jpg`
        }
      ]
    }
  ]
};

// Función helper para obtener URL del video
export const getYouTubeUrl = (videoId) => {
  return `https://www.youtube.com/watch?v=${videoId}`;
};

// Función helper para obtener thumbnail en diferentes calidades
export const getThumbnail = (videoId, quality = 'mqdefault') => {
  // Calidades disponibles: default, mqdefault, hqdefault, sddefault, maxresdefault
  return `https://img.youtube.com/vi/${videoId}/${quality}.jpg`;
};
