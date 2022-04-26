import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import {
	collection,
	getDocs,
	query,
	where,
	orderBy,
	limit,
	startAfter,
} from 'firebase/firestore'
import { db } from '../firebase.config'
import { toast } from 'react-toastify'

import Spinner from '../components/Spinner'
import ListingItem from '../components/ListingItem'

function Offers() {
	const [listings, setListings] = useState(null)
	const [loading, setLoading] = useState(true)
	const [lastFetchedListing, setLastFetchedListing] = useState(null)

	const params = useParams()

	useEffect(() => {
		const fetchListings = async () => {
			try {
				// get reference
				const listingsRef = collection(db, 'listings')

				// create query
				const q = query(
					listingsRef,
					where('offer', '==', true),
					orderBy('timestamp', 'desc'),
					limit(10)
				)

				// execute query
				const querySnap = await getDocs(q)

				const lastVisible = querySnap.docs[querySnap.docs.length - 1]
				setLastFetchedListing(lastVisible)

				let listings = []

				//pushing listings to the array
				querySnap.forEach((doc) => {
					// console.log(doc.data())
					return listings.push({
						id: doc.id,
						data: doc.data(),
					})
				})
				setListings(listings)
				setLoading(false)
			} catch (error) {
				toast.error('Could not fetch listings')
			}
		}
		fetchListings()
	}, [])

	const onFetchMoreListings = async () => {
		try {
			// get reference
			const listingsRef = collection(db, 'listings')

			// create query
			const q = query(
				listingsRef,
				where('offer', '==', true),
				orderBy('timestamp', 'desc'),
				startAfter(lastFetchedListing),
				limit(10)
			)

			// execute query
			const querySnap = await getDocs(q)

			const lastVisible = querySnap.docs[querySnap.docs.length - 1]
			setLastFetchedListing(lastVisible)

			let listings = []

			//pushing listings to the array
			querySnap.forEach((doc) => {
				// console.log(doc.data())
				return listings.push({
					id: doc.id,
					data: doc.data(),
				})
			})
			setListings((prevState) => [...prevState, ...listings])
			setLoading(false)
		} catch (error) {
			toast.error('Could not fetch listings')
		}
	}


	return (
		<div className='category'>
			<header>
				<p className='pageHeader'>Offers</p>
			</header>

			{loading ? (
				<Spinner />
			) : listings && listings.length > 0 ? (
				<>
					<main>
						<div className='categoryListings'>
							{listings.map((listing) => (
								<ListingItem
									listing={listing.data}
									id={listing.id}
									key={listing.id}
								/>
							))}
						</div>
					</main>
					<br />
					<br />

					{lastFetchedListing && (
						<p className='loadMore' onClick={onFetchMoreListings}>
							Load More...
						</p>
					)}
				</>
			) : (
				<h2>There are no current offers!</h2>
			)}
		</div>
	)
}

export default Offers
