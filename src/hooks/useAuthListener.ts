``````typescript
import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { supabase } from '@/src/integrations/supabase/client.ts' // ВАЖНО: замените на ваш реальный путь к supabase клиенту

/**
 * Hook для обработки OAuth callback токенов и слушания событий авторизации
 * Работает для обоих доменов (invest-ex.ru и invest-ex.online)
 */
export function useAuthListener() {
  const navigate = useNavigate()

  useEffect(() => {
    let subscription: any

    // Асинхронная функция для инициализации слушателя
    const initializeAuthListener = async () => {
      // Слушайте все события авторизации
      const { data } = supabase.auth.onAuthStateChange(
        (event, session) => {
          console.log('Auth event:', event, 'Session:', session?.user?.email)

          if (event === 'SIGNED_IN' && session) {
            // Авторизация успешна
            console.log('User signed in successfully')
            
            // Очистите URL от хэша (токены)
            if (window.location.hash.includes('access_token')) {
              window.history.replaceState(
                {},
                document.title,
                window.location.pathname
              )
            }
          }

          if (event === 'SIGNED_OUT') {
            // Пользователь вышел из системы
            console.log('User signed out')
            navigate('/login')
          }

          if (event === 'TOKEN_REFRESHED') {
            // Токен обновлен
            console.log('Token refreshed')
          }

          if (event === 'USER_UPDATED') {
            // Пользователь обновлен
            console.log('User updated')
          }
        }
      )

      subscription = data.subscription
    }

    initializeAuthListener()

    // Очистка подписки при размонтировании компонента
    return () => {
      if (subscription) {
        subscription.unsubscribe()
      }
    }
  }, [navigate])
}
