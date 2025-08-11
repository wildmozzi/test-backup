import { useState } from 'react'
import { useAuth } from '../hooks/useAuth'

function Main() {
  const { user, signOut } = useAuth()
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const handleSignOut = async () => {
    setLoading(true)
    try {
      await signOut()
    } catch (err) {
      setError('로그아웃 중 오류가 발생했습니다.')
    } finally {
      setLoading(false)
    }
  }

  if (!user) {
    return <div>사용자 정보를 불러오는 중...</div>
  }

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
          메인 페이지
        </h2>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
          <div className="space-y-6">
            <div className="text-center">
              <h3 className="text-lg font-medium text-gray-900">로그인 성공!</h3>
              <div className="mt-4 p-4 bg-green-50 rounded-md">
                <p className="text-sm text-green-800">
                  <strong>사용자 ID:</strong> {user.id}
                </p>
                <p className="text-sm text-green-800">
                  <strong>이메일:</strong> {user.email}
                </p>
                <p className="text-sm text-green-800">
                  <strong>생성일:</strong> {new Date(user.created_at).toLocaleString()}
                </p>
              </div>
            </div>

            {error && (
              <div className="p-3 bg-red-50 rounded-md">
                <p className="text-sm text-red-800">{error}</p>
              </div>
            )}

            <button
              onClick={handleSignOut}
              disabled={loading}
              className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 disabled:opacity-50"
            >
              {loading ? '로그아웃 중...' : '로그아웃'}
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Main
