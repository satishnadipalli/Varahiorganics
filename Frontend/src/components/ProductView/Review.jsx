import { StarIcon, QuoteIcon } from 'lucide-react'


export default function ReviewCard({ name, avatarSrc, review, rating, position,date }) {
  return (
    <div className="w-full mt-10 max-w-3xl mx-auto bg-white dark:bg-gray-300 shadow-md rounded-lg overflow-hidden transition-all duration-300 hover:shadow-lg">
      <div className="p-6 bg-gradient-to-r from-blue-50 to-indigo-50 bg-white text-black">
        <div className="flex items-center space-x-4">
          <div className="relative w-12 h-12 rounded-full overflow-hidden ring-2 ring-blue-500 ring-offset-2 dark:ring-offset-gray-800">
            <img 
              src={avatarSrc} 
              alt={name} 
              className="w-full h-full object-cover"
              onError={(e) => {
                e.currentTarget.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(name)}&background=3b82f6&color=ffffff`;
              }}
            />
          </div>
          <div className="flex-grow">
            <h3 className="text-lg font-semibold text-black">{name}</h3>
            {position && <p className="text-sm text-black">{date}</p>}
          </div>
          <div className="flex items-center">
            {[...Array(5)].map((_, i) => (
              <StarIcon
                key={i}
                className={`h-5 w-5 ${
                  i < rating ? "text-yellow-400 fill-current" : "text-gray-300 dark:text-gray-600"
                }`}
              />
            ))}
          </div>
        </div>
        <div className="mt-4 flex items-start">
          <QuoteIcon className="w-8 h-8 mr-2 text-blue-500 opacity-20 flex-shrink-0" />
          <p className="text-black">{review}</p>
        </div>
      </div>
    </div>
  )
}

