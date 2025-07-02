import React from 'react';
import { Card, CardContent, CardFooter } from './ui/card';
import Button from './ui/button';
import { Code, Heart, BarChart, Palette } from 'lucide-react';

const categories = [
	{ name: 'Technology', icon: <Code /> },
	{ name: 'Lifestyle', icon: <Heart /> },
	{ name: 'Business', icon: <BarChart /> },
	{ name: 'Design', icon: <Palette /> },
];

const Discover = () => {
	return (
		<section className="py-16">
			<div className="container mx-auto px-4">
				<h2 className="text-3xl font-bold text-center">
					Discover Amazing Content
				</h2>
				<p className="text-center text-gray-500 mt-2">
					From technology to lifestyle, find articles that match your interests.
				</p>
				<div className="mt-12 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
					{categories.map((category) => (
						<Card
							key={category.name}
							className="text-center hover:shadow-lg transition-shadow"
						>
							<CardContent className="pt-6">
								<div className="mx-auto bg-gray-100 rounded-full h-16 w-16 flex items-center justify-center">
									{React.cloneElement(category.icon, {
										className: 'h-8 w-8 text-gray-600',
									})}
								</div>
								<h3 className="mt-4 text-xl font-semibold">
									{category.name}
								</h3>
								<p className="mt-2 text-gray-500 text-sm">
									Explore the latest trends and insights in{' '}
									{category.name.toLowerCase()}.
								</p>
							</CardContent>
							<CardFooter>
								<Button variant="ghost" className="w-full">
									Explore
								</Button>
							</CardFooter>
						</Card>
					))}
				</div>
			</div>
		</section>
	);
};

export default Discover;
