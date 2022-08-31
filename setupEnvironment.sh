# Step One- Fill out the WEEK_18_REPO_NAME and GITHUB_USERNAME

# Step Two - configure your shell to always have these variables.
# For OSX / Linux
# Copy and paste ALL of the properties below into your .bash_profile in your home directly

# For Windows
# Copy and paste ALL of the properties below into your .bashrc file in your home directory


# Fill out the following values
# The path of your repo on github.  Don't but the whole URL, just the part after github.com/
export WEEK_18_REPO_NAME=ata-week-18-$GITHUB_USERNAME

# Do not modify the rest of these unless you have been instructed to do so.
export WEEK_18_PROJECT_NAME=week18
export WEEK_18_PIPELINE_STACK=$WEEK_18_PROJECT_NAME-$GITHUB_USERNAME
export WEEK_18_ARTIFACT_BUCKET=$WEEK_18_PROJECT_NAME-$GITHUB_USERNAME-artifacts
export WEEK_18_DEPLOY_STACK=$WEEK_18_PROJECT_NAME-$GITHUB_USERNAME-application
export WEEK_18_APPLICATION_NAME=$WEEK_18_PROJECT_NAME-$GITHUB_USERNAME-application
export WEEK_18_ENVIRONMENT_NAME=$WEEK_18_PROJECT_NAME-$GITHUB_USERNAME-environment-dev
