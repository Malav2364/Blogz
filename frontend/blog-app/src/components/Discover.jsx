import React from 'react';
import { Code, Heart, BarChart, Palette } from 'lucide-react';

const categories = [
	{ name: 'Technology', icon: <Code /> },
	{ name: 'Lifestyle', icon: <Heart /> },
	{ name: 'Business', icon: <BarChart /> },
	{ name: 'Design', icon: <Palette /> },
];

const Discover = () => {
	return (
		<section className="py-16 bg-slate-50">
			<div className="container mx-auto px-4">
				<div className="grid md:grid-cols-2 gap-16 items-center">
					<div className="md:order-2">
						<h2 className="text-4xl font-bold text-slate-900 mb-4">
							Discover Amazing Content
						</h2>
						<p className="text-slate-600 mt-2 mb-8">
							From technology to lifestyle, find articles that match your
							interests. Explore a world of knowledge and creativity.
						</p>
						<div className="grid grid-cols-2 gap-6">
							{categories.map((category) => (
								<div
									key={category.name}
									className="flex items-center space-x-4 p-4 rounded-lg bg-white border border-slate-200 hover:border-slate-300 hover:shadow-sm transition-all duration-300"
								>
									<div className="bg-cyan-100 text-cyan-600 rounded-full p-3">
										{React.cloneElement(category.icon, {
											className: 'h-6 w-6',
										})}
									</div>
									<div>
										<h3 className="font-semibold text-slate-800">{category.name}</h3>
										<a
											href="#"
											className="text-sm text-cyan-600 hover:underline"
										>
											Explore
										</a>
									</div>
								</div>
							))}
						</div>
					</div>
					<div className="md:order-1">
						<img
							src="https://images.unsplash.com/photo-1499750310107-5fef28a66643?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
							alt="Discover Content"
							className="rounded-lg shadow-xl w-full h-full object-cover"
						/>
					</div>
				</div>
			</div>
		</section>
	);
};

export default Discover;
