import { useEffect, useState } from "react";

import "./Search.css";

import MainLayout from "../../components/layout/MainLayout";

import UserCard from "../../components/user/UserCard";

import Loader from "../../components/common/Loader";

import EmptyState from "../../components/common/EmptyState";

import { searchUsers } from "../../services/userApi";

function Search() {

    const [keyword, setKeyword] = useState("");

    const [users, setUsers] = useState([]);

    const [loading, setLoading] = useState(false);

    const fetchUsers = async (value) => {

        try {

            setLoading(true);

            const { data } = await searchUsers(value);

            setUsers(data.users);

        }

        catch (error) {

            console.error(error);

        }

        finally {

            setLoading(false);

        }

    };

    useEffect(() => {

        if (keyword.trim() === "") {

            setUsers([]);

            return;

        }

        const timer = setTimeout(() => {

            fetchUsers(keyword);

        }, 400);

        return () => clearTimeout(timer);

    }, [keyword]);

    useEffect(() => {

        const timer = setTimeout(() => {

            fetchUsers(keyword);

        }, 400);

        return () => clearTimeout(timer);

    }, [keyword]);

    return (

        <MainLayout>

            <div className="search-page">

                <input

                    className="search-input"

                    type="text"

                    placeholder="Search users..."

                    value={keyword}

                    onChange={(e) =>

                        setKeyword(e.target.value)

                    }

                />

                {

                    loading ?

                        <Loader />

                        :

                        users.length === 0 ?

                            (

                                <EmptyState

                                    title="No Users"

                                    description="Try another search."

                                />

                            )

                            :

                            (

                                users.map(user => (

                                    <UserCard

                                        key={user._id}

                                        user={user}

                                    />

                                ))

                            )

                }

            </div>

        </MainLayout>

    );

}

export default Search;  