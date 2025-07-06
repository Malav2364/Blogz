import React from 'react';
import { Card, CardContent, CardFooter } from './ui/card';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';
import Button from './ui/button';
import { Heart, MessageSquare } from 'lucide-react';

const featuredArticles = [
	{
		title: 'Building Modern Web Applications with React',
		author: 'Sarah Mitchell',
		authorAvatar: 'https://randomuser.me/api/portraits/women/1.jpg',
		readTime: '5 min read',
		tags: ['React', 'Web Dev'],
		likes: 29,
		comments: 7,
		image:
			'https://images.unsplash.com/photo-1522252234503-e356532cafd5?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
	},
	{
		title: 'The Future of AI in Software Development',
		author: 'Michael Johnson',
		authorAvatar: 'https://randomuser.me/api/portraits/men/2.jpg',
		readTime: '7 min read',
		tags: ['AI', 'Development'],
		likes: 42,
		comments: 15,
		image:
			'https://images.unsplash.com/photo-1558655146-364adaf1fcc9?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
	},
	{
		title: 'Design Systems: A Complete Guide for 2024',
		author: 'Lisa Kumar',
		authorAvatar: 'https://randomuser.me/api/portraits/women/3.jpg',
		readTime: '10 min read',
		tags: ['Design', 'UI/UX'],
		likes: 68,
		comments: 23,
		image:
			'https://images.unsplash.com/photo-1558655146-364adaf1fcc9?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
	},
];

const Featured = () => {
	return (
		<section className="bg-white py-16">
			<div className="container mx-auto px-4">
				<h2 className="text-4xl font-bold text-center text-slate-900">
					Featured Articles
				</h2>
				<p className="text-center text-slate-600 mt-2 mb-12">
					Hand-picked stories from our community
				</p>
				<div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-8">
					{featuredArticles.map((article) => (
						<Card
							key={article.title}
							className="overflow-hidden bg-white border border-slate-200 rounded-xl shadow-sm hover:shadow-lg transition-all duration-300"
						>
							<img
								src={article.image}
								alt={article.title}
								className="w-full h-48 object-cover"
							/>
							<CardContent className="p-6">
								<div className="flex items-center space-x-3 mb-4">
									<Avatar>
										<AvatarImage src={article.authorAvatar} />
										<AvatarFallback>
											{article.author.slice(0, 2)}
										</AvatarFallback>
									</Avatar>
									<div>
										<p className="font-semibold text-sm text-slate-800">
											{article.author}
										</p>
										<p className="text-xs text-slate-500">
											{article.readTime}
										</p>
									</div>
								</div>
								<h3 className="text-xl font-bold mb-3 text-slate-900 hover:text-cyan-600 transition-colors">
									<a href="#">{article.title}</a>
								</h3>
								<div className="flex flex-wrap gap-2 mb-4">
									{article.tags.map((tag) => (
										<span
											key={tag}
											className="bg-cyan-100 text-cyan-700 text-xs font-medium px-3 py-1 rounded-full"
										>
											{tag}
										</span>
									))}
								</div>
							</CardContent>
							<CardFooter className="flex justify-between items-center bg-slate-50 p-6">
								<div className="flex space-x-4 text-slate-500">
									<div className="flex items-center space-x-1.5 hover:text-pink-500 transition-colors">
										<Heart className="h-5 w-5" />
										<span className="text-sm font-medium">{article.likes}</span>
									</div>
									<div className="flex items-center space-x-1.5 hover:text-cyan-600 transition-colors">
										<MessageSquare className="h-5 w-5" />
										<span className="text-sm font-medium">{article.comments}</span>
									</div>
								</div>
								<Button variant="secondary" size="sm">
									Read More
								</Button>
							</CardFooter>
						</Card>
					))}
				</div>
			</div>
		</section>
	);
};

export default Featured;
