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
		<section className="py-16 bg-slate-50">
			<div className="container mx-auto px-4">
				<h2 className="text-4xl font-bold text-center text-slate-900">
					Meet Our Writers
				</h2>
				<p className="text-center text-slate-600 mt-2 mb-12">
					Talented individuals sharing their expertise with the world
				</p>
				<div className="mt-12 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
					{writers.map((writer) => (
						<Card
							key={writer.name}
							className="text-center p-6 bg-white border border-slate-200 rounded-xl shadow-sm hover:shadow-md transition-all duration-300"
						>
							<Avatar className="h-24 w-24 mx-auto ring-4 ring-slate-100">
								<AvatarImage src={writer.avatar} />
								<AvatarFallback>
									{writer.name.slice(0, 2)}
								</AvatarFallback>
							</Avatar>
							<h3 className="mt-5 text-xl font-semibold text-slate-900">
								{writer.name}
							</h3>
							<p className="text-slate-500 text-sm mb-4">
								{writer.role}
							</p>
							<Button
								variant="outline"
								className="border-cyan-600 text-cyan-600 hover:bg-cyan-600 hover:text-white"
							>
								Follow
							</Button>
						</Card>
					))}
				</div>
			</div>
		</section>
	);
};

export default Writers;
