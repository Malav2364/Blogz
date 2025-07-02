import React from 'react';
import { Card, CardContent } from './ui/card';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';
import Button from './ui/button';

const writers = [
	{
		name: 'Sarah Mitchell',
		role: 'Software Engineer',
		avatar: 'https://randomuser.me/api/portraits/women/1.jpg',
	},
	{
		name: 'Michael Johnson',
		role: 'AI Researcher',
		avatar: 'https://randomuser.me/api/portraits/men/2.jpg',
	},
	{
		name: 'Lisa Kumar',
		role: 'UX Designer',
		avatar: 'https://randomuser.me/api/portraits/women/3.jpg',
	},
	{
		name: 'David Wilson',
		role: 'Product Manager',
		avatar: 'https://randomuser.me/api/portraits/men/4.jpg',
	},
];

const Writers = () => {
	return (
		<section className="py-16">
			<div className="container mx-auto px-4">
				<h2 className="text-3xl font-bold text-center">
					Meet Our Writers
				</h2>
				<p className="text-center text-gray-500 mt-2">
					Talented individuals sharing their expertise with the world
				</p>
				<div className="mt-12 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
					{writers.map((writer) => (
						<Card
							key={writer.name}
							className="text-center p-6 hover:bg-gray-50 transition-colors"
						>
							<Avatar className="h-24 w-24 mx-auto">
								<AvatarImage src={writer.avatar} />
								<AvatarFallback>
									{writer.name.slice(0, 2)}
								</AvatarFallback>
							</Avatar>
							<h3 className="mt-4 text-xl font-semibold">
								{writer.name}
							</h3>
							<p className="text-gray-500 text-sm">
								{writer.role}
							</p>
							<Button
								variant="outline"
								className="mt-4"
							>
								Follow
							</Button>
						</Card>
					))}
				</div>
				<div className="text-center mt-12">
					<Button variant="outline">View All Writers</Button>
				</div>
			</div>
		</section>
	);
};

export default Writers;
