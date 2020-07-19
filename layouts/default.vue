<template>
    <div>
        <v-app>
            <b-navbar toggleable="md" variant="light">
                <b-navbar-toggle target="nav_collapse" />
                <b-navbar-brand to="/">
                </b-navbar-brand>

                <b-collapse id="nav_collapse" is-nav>
                    <b-navbar-nav>
                        <b-nav-item to="/" exact>
                            Home
                        </b-nav-item>
                        <b-nav-item to="/public">
                            Public
                        </b-nav-item>
                        <b-nav-item to="/secure">
                            Secure
                        </b-nav-item>
                        <b-nav-item to="/users">
                            Users
                        </b-nav-item>
                        <b-nav-item to="/products">
                            Products
                        </b-nav-item>
                    </b-navbar-nav>
                    <b-navbar-nav class="ml-auto">
                        <template v-if="$auth.$state.loggedIn">
                            <b-nav-item-dropdown :text="$auth.user.name" right>
                                <b-dropdown-item @click="$auth.logout()">
                                    Logout
                                </b-dropdown-item>
                            </b-nav-item-dropdown>
                            <b-img :src="picture" class="mt-1" rounded="circle" width="30px" height="30px" />
                        </template>
                        <template v-else>
                            <b-dropdown-item to="/login">
                                Login
                            </b-dropdown-item>
                        </template>
                    </b-navbar-nav>
                </b-collapse>
            </b-navbar>
            <b-container class="mt-4">
                <nuxt />
            </b-container>
        </v-app>
    </div>
</template>

<script>
    import get from 'lodash.get'

    export default {
        computed: {
            picture() {
                return get(this.$auth.user, 'picture')
                get(this.$auth.user, 'picture.data.url')
                get(this.$auth.user, 'avatar_url')
            }
        }
    }
</script>
