import { ImageWithFallback } from './figma/ImageWithFallback';
import { Badge } from './ui/badge';
import { Button } from './ui/button';
import { Card } from './ui/card';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';
import { Heart, MessageCircle, MapPin, Clock } from 'lucide-react';

interface Product {
  id: string;
  title: string;
  price: number;
  originalPrice?: number;
  image: string;
  condition: 'New' | 'Like New' | 'Good' | 'Fair';
  seller: {
    name: string;
    avatar?: string;
    rating: number;
    verified: boolean;
    email?: string;
  };
  location: string;
  postedTime: string;
  category: string;
  isFavorited?: boolean;
}

interface ProductCardProps {
  product: Product;
  onFavorite?: (productId: string) => void;
  onMessage?: (productId: string, recipientEmail?: string) => void;
}

export function ProductCard({ product, onFavorite, onMessage }: ProductCardProps) {
  const getConditionColor = (condition: string) => {
    switch (condition) {
      case 'New': return 'bg-green-500';
      case 'Like New': return 'bg-blue-500';
      case 'Good': return 'bg-yellow-500';
      case 'Fair': return 'bg-orange-500';
      default: return 'bg-gray-500';
    }
  };

  return (
    <Card className="group overflow-hidden card-hover border-0 shadow-soft hover:shadow-strong rounded-2xl bg-white">
      <div className="relative">
        <div className="aspect-square overflow-hidden bg-gray-50">
          <ImageWithFallback
            src={product.image}
            alt={product.title}
            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
          />
        </div>
        
        {/* Overlay Actions */}
        <div className="absolute top-4 right-4 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <Button
            size="icon"
            variant="secondary"
            className="w-10 h-10 rounded-full bg-white/95 hover:bg-white backdrop-blur-md shadow-lg hover:scale-110 transition-all duration-200"
            onClick={() => onFavorite?.(product.id)}
          >
            <Heart 
              className={`w-5 h-5 ${product.isFavorited ? 'fill-red-500 text-red-500' : 'text-gray-700'}`} 
            />
          </Button>
        </div>

        {/* Condition Badge */}
        <div className="absolute top-4 left-4">
          <Badge className={`${getConditionColor(product.condition)} text-white shadow-md px-3 py-1 font-semibold`}>
            {product.condition}
          </Badge>
        </div>

        {/* Price Overlay */}
        {product.originalPrice && (
          <div className="absolute bottom-3 left-3">
            <Badge variant="destructive" className="bg-red-500">
              -{Math.round((1 - product.price / product.originalPrice) * 100)}% OFF
            </Badge>
          </div>
        )}
      </div>

      <div className="p-5 space-y-4">
        {/* Title and Category */}
        <div>
          <h3 className="font-bold text-lg line-clamp-2 group-hover:text-blue-600 transition-colors leading-snug">
            {product.title}
          </h3>
          <p className="text-sm text-gray-500 mt-1 font-medium">{product.category}</p>
        </div>

        {/* Price */}
        <div className="flex items-baseline gap-2">
          <span className="text-2xl font-bold text-gray-900">₹{product.price}</span>
          {product.originalPrice && (
            <span className="text-base text-gray-400 line-through">
              ₹{product.originalPrice}
            </span>
          )}
        </div>

        {/* Seller Info */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Avatar className="w-6 h-6">
              <AvatarImage src={product.seller.avatar} />
              <AvatarFallback className="text-xs">
                {product.seller.name.charAt(0)}
              </AvatarFallback>
            </Avatar>
            <div className="flex items-center gap-1">
              <span className="text-sm font-medium">{product.seller.name}</span>
              {product.seller.verified && (
                <Badge variant="secondary" className="text-xs px-1 py-0">
                  ✓
                </Badge>
              )}
            </div>
          </div>
          <div className="flex items-center gap-1">
            <span className="text-xs text-muted-foreground">★</span>
            <span className="text-xs font-medium">{product.seller.rating}</span>
          </div>
        </div>

        {/* Location and Time */}
        <div className="flex items-center justify-between text-xs text-muted-foreground">
          <div className="flex items-center gap-1">
            <MapPin className="w-3 h-3" />
            <span>{product.location}</span>
          </div>
          <div className="flex items-center gap-1">
            <Clock className="w-3 h-3" />
            <span>{product.postedTime}</span>
          </div>
        </div>

        {/* Action Button */}
        <Button 
          className="w-full gap-2" 
          variant="outline"
          onClick={() => onMessage?.(product.id, product.seller.email)}
        >
          <MessageCircle className="w-4 h-4" />
          Message Seller
        </Button>
      </div>
    </Card>
  );
}